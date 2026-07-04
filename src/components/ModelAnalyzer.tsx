import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, useProgress, Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  FileText,
  CreditCard,
  BookOpen,
  X,
  ExternalLink,
  Download,
  Github,
  Mail,
  Share2,
  CheckCircle2,
  Star,
  GitFork,
  Code2,
  UserCheck,
  Volume2,
  VolumeX,
  Facebook,
  MessageCircle
} from 'lucide-react';

export type ItemType = 'paper' | 'lanyard' | 'bookshelf';

const ITEM_CONFIG: Record<ItemType, { title: string; buttonText: string; color: string; bgGlow: string }> = {
  paper: {
    title: '📄 Curriculum Vitae (A4 Paper)',
    buttonText: 'CV',
    color: '#38bdf8', // Neon Cyan
    bgGlow: 'rgba(56, 189, 248, 0.25)'
  },
  lanyard: {
    title: '🪪 Developer Info & Socials',
    buttonText: 'Info',
    color: '#f59e0b', // Neon Amber Gold
    bgGlow: 'rgba(245, 158, 11, 0.25)'
  },
  bookshelf: {
    title: '📚 Open Source Projects & Repos',
    buttonText: 'Projects', // Concise, professional agency term for the bookshelf
    color: '#2f4786ff', // Soft Neon Purple
    bgGlow: 'rgba(192, 132, 252, 0.25)'
  }
};

function getItemType(name: string): ItemType | null {
  const n = name.toLowerCase();
  if (n.includes('paper') || n.includes('note') || n.includes('stackofpaper')) return 'paper';
  if (n.includes('lanyard') || n.includes('key') || n.includes('card') || n.includes('id_')) return 'lanyard';
  if (n.includes('book') || n.includes('shelf') || n.includes('bookshelf')) return 'bookshelf';
  return null;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-8 bg-slate-950/95 backdrop-blur-2xl rounded-3xl border border-sky-500/30 shadow-[0_0_50px_rgba(56,189,248,0.2)] text-white min-w-[340px] pointer-events-none select-none">
        <div className="loader mb-4"></div>
        <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden mt-2 border border-slate-700/80 p-0.5">
          <div
            className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-500 h-full transition-all duration-300 rounded-full shadow-[0_0_12px_#38bdf8]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-xs font-mono mt-3 text-slate-300">
          <span>3D SCENE: MAIN.GLB</span>
          <span className="text-sky-400 font-bold">{progress.toFixed(0)}%</span>
        </div>
      </div>
    </Html>
  );
}

/**
 * POVControls: First-person sitting perspective looking at computer screen.
 */
function POVControls({
  headPosition = [5.0, 10.0, 0.5],
  lookTarget = [1.5, 9.5, 0],
  sensitivity = 0.0008
}: {
  headPosition?: [number, number, number];
  lookTarget?: [number, number, number];
  sensitivity?: number;
}) {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  const initialAngles = React.useMemo(() => {
    const dx = lookTarget[0] - headPosition[0];
    const dy = lookTarget[1] - headPosition[1];
    const dz = lookTarget[2] - headPosition[2];
    const horizDist = Math.sqrt(dx * dx + dz * dz);

    const yaw = Math.atan2(-dx, -dz);
    const pitch = Math.atan2(dy, horizDist);
    return { yaw, pitch };
  }, [headPosition[0], headPosition[1], headPosition[2], lookTarget[0], lookTarget[1], lookTarget[2]]);

  const targetYaw = useRef(initialAngles.yaw);
  const targetPitch = useRef(initialAngles.pitch);

  const currentYaw = useRef(initialAngles.yaw);
  const currentPitch = useRef(initialAngles.pitch);

  useEffect(() => {
    targetYaw.current = initialAngles.yaw;
    targetPitch.current = initialAngles.pitch;
    currentYaw.current = initialAngles.yaw;
    currentPitch.current = initialAngles.pitch;
  }, [initialAngles]);

  useEffect(() => {
    const domElement = gl.domElement;

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      try {
        domElement.setPointerCapture(e.pointerId);
      } catch { }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };

      targetYaw.current += deltaX * sensitivity;
      targetPitch.current += deltaY * sensitivity;

      targetYaw.current = Math.max(initialAngles.yaw - Math.PI / 1.3, Math.min(initialAngles.yaw + Math.PI / 1.3, targetYaw.current));
      targetPitch.current = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 3, targetPitch.current));
    };

    const handlePointerUp = (e: PointerEvent) => {
      isDragging.current = false;
      try {
        domElement.releasePointerCapture(e.pointerId);
      } catch { }
    };

    domElement.addEventListener('pointerdown', handlePointerDown);
    domElement.addEventListener('pointermove', handlePointerMove);
    domElement.addEventListener('pointerup', handlePointerUp);
    domElement.addEventListener('pointercancel', handlePointerUp);

    return () => {
      domElement.removeEventListener('pointerdown', handlePointerDown);
      domElement.removeEventListener('pointermove', handlePointerMove);
      domElement.removeEventListener('pointerup', handlePointerUp);
      domElement.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [gl, sensitivity, initialAngles]);

  useFrame(() => {
    camera.position.set(headPosition[0], headPosition[1], headPosition[2]);

    currentYaw.current = THREE.MathUtils.lerp(currentYaw.current, targetYaw.current, 0.12);
    currentPitch.current = THREE.MathUtils.lerp(currentPitch.current, targetPitch.current, 0.12);

    const euler = new THREE.Euler(currentPitch.current, currentYaw.current, 0, 'YXZ');
    camera.quaternion.setFromEuler(euler);
  });

  return null;
}

interface ModelContentProps {
  hoveredItem: ItemType | null;
  onHoverItem: (item: ItemType | null) => void;
  onSelectItem: (item: ItemType) => void;
  activeModal: ItemType | null;
}

function ModelContent({ hoveredItem, onHoverItem, onSelectItem, activeModal }: ModelContentProps) {
  const gltf = useGLTF('/main.glb');
  const modelGroupRef = useRef<THREE.Group>(null);

  const [itemPositions, setItemPositions] = useState<Record<ItemType, THREE.Vector3>>({
    paper: new THREE.Vector3(14.6, 0.8, 0.5),
    lanyard: new THREE.Vector3(0.0, 0.15, 0.0),
    bookshelf: new THREE.Vector3(-2.0, 3.2, -1.0)
  });

  useEffect(() => {
    if (!gltf.scene) return;
    const newPos: Record<ItemType, THREE.Vector3> = {
      paper: new THREE.Vector3(14.6, 0.8, 0.5),
      lanyard: new THREE.Vector3(0.0, 0.15, 0.0),
      bookshelf: new THREE.Vector3(-2.0, 3.2, -1.0)
    };

    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          if (!mesh.userData.origEmissive) {
            mesh.userData.origEmissive = mat.emissive ? mat.emissive.clone() : new THREE.Color(0x000000);
            mesh.userData.origEmissiveIntensity = mat.emissiveIntensity ?? 0;
          }
        }
      }

      const itemType = getItemType(child.name);
      if (itemType) {
        const box = new THREE.Box3().setFromObject(child);
        if (!box.isEmpty()) {
          const center = new THREE.Vector3();
          box.getCenter(center);
          if (itemType === 'paper') center.y += 0.08;      // Hugging directly on top of paper
          if (itemType === 'lanyard') center.y += 0.06;    // Hugging directly on top of ID lanyard
          if (itemType === 'bookshelf') center.y += 0.15;  // Hugging neatly on bookshelf shelf
          newPos[itemType] = center;
        }
      }
    });

    setItemPositions(newPos);
  }, [gltf.scene]);

  // Subtle Luminescence & Edges Wireframe Outline on Hover
  useEffect(() => {
    if (!gltf.scene) return;

    gltf.scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (!mat || !mesh.userData.origEmissive) return;

        const itemType = getItemType(mesh.name) || getItemType(mesh.parent?.name || '') || getItemType(mesh.parent?.parent?.name || '');

        const existingEdge = mesh.getObjectByName('hover_edge_outline');
        if (existingEdge) {
          mesh.remove(existingEdge);
          (existingEdge as THREE.LineSegments).geometry.dispose();
        }

        if (itemType && itemType === hoveredItem && !activeModal) {
          // Subtle, soft luminescence (not overwhelming)
          mat.emissive.set(ITEM_CONFIG[itemType].color);
          mat.emissiveIntensity = 0.16;

          // Crisp neon line outline along physical 3D geometry edges
          try {
            const edgesGeo = new THREE.EdgesGeometry(mesh.geometry, 25);
            const edgesMat = new THREE.LineBasicMaterial({
              color: ITEM_CONFIG[itemType].color,
              linewidth: 2,
              transparent: true,
              opacity: 0.85
            });
            const line = new THREE.LineSegments(edgesGeo, edgesMat);
            line.name = 'hover_edge_outline';
            mesh.add(line);
          } catch { }
        } else {
          mat.emissive.copy(mesh.userData.origEmissive);
          mat.emissiveIntensity = mesh.userData.origEmissiveIntensity;
        }
      }
    });
  }, [hoveredItem, activeModal, gltf.scene]);

  const handlePointerMove = (e: any) => {
    if (activeModal) return;
    e.stopPropagation();
    const hitMesh = e.object;
    const itemType = getItemType(hitMesh.name) || getItemType(hitMesh.parent?.name || '') || getItemType(hitMesh.parent?.parent?.name || '');
    if (itemType !== hoveredItem) {
      onHoverItem(itemType);
      document.body.style.cursor = itemType ? 'pointer' : 'grab';
    }
  };

  const handlePointerOver = (e: any) => {
    if (activeModal) return;
    e.stopPropagation();
    const hitMesh = e.object;
    const itemType = getItemType(hitMesh.name) || getItemType(hitMesh.parent?.name || '') || getItemType(hitMesh.parent?.parent?.name || '');
    if (itemType) {
      onHoverItem(itemType);
      document.body.style.cursor = 'pointer';
    } else {
      onHoverItem(null);
      document.body.style.cursor = 'grab';
    }
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    onHoverItem(null);
    document.body.style.cursor = 'grab';
  };

  const handleClick = (e: any) => {
    if (activeModal) return;
    e.stopPropagation();
    const hitMesh = e.object;
    const itemType = getItemType(hitMesh.name) || getItemType(hitMesh.parent?.name || '') || getItemType(hitMesh.parent?.parent?.name || '');
    if (itemType) {
      onSelectItem(itemType);
    }
  };

  return (
    <group ref={modelGroupRef} onPointerMove={handlePointerMove} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} onClick={handleClick}>
      <primitive object={gltf.scene} />

      {/* Ultra-compact minimalist labels hugging objects (Ẩn toàn bộ khi đang mở bất kỳ modal nào) */}
      {!activeModal && (Object.keys(ITEM_CONFIG) as ItemType[]).map((key) => {
        const pos = itemPositions[key];
        const isHovered = hoveredItem === key;
        const config = ITEM_CONFIG[key];

        return (
          <Html
            key={key}
            position={[pos.x, pos.y, pos.z]}
            center
            distanceFactor={12}
            zIndexRange={[100, 0]}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                onSelectItem(key);
              }}
              onMouseEnter={() => {
                onHoverItem(key);
                document.body.style.cursor = 'pointer';
              }}
              onMouseLeave={() => {
                onHoverItem(null);
                document.body.style.cursor = 'grab';
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-sans text-[11px] font-semibold transition-all duration-200 cursor-pointer select-none whitespace-nowrap backdrop-blur-md border shadow-md ${isHovered
                ? 'scale-105 opacity-100 ring-1 ring-white/30'
                : 'scale-100 opacity-80 hover:opacity-100'
                }`}
              style={{
                backgroundColor: isHovered ? 'rgba(15, 23, 42, 0.92)' : 'rgba(15, 23, 42, 0.75)',
                borderColor: isHovered ? config.color : 'rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                boxShadow: isHovered ? `0 0 15px ${config.bgGlow}` : `0 2px 6px rgba(0,0,0,0.4)`
              }}
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: config.color }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: config.color }}
                />
              </span>

              <span className="tracking-wide">{config.buttonText}</span>
            </div>
          </Html>
        );
      })}
    </group>
  );
}

// ==================== INTERACTIVE MODALS ====================

function ModalCV({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-slate-900/95 border border-sky-500/40 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-[0_0_50px_rgba(56,189,248,0.2)] backdrop-blur-xl text-slate-100 animate-in fade-in zoom-in duration-200 max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-start border-b border-slate-700/80 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
            <FileText size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-wide text-white">CURRICULUM VITAE</h3>
            <p className="text-xs text-sky-400 font-mono mt-0.5">Fullstack 3D Web & Interactive Designer (10+ Years Exp)</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-slate-300">
        <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2 font-mono">Executive Summary</h4>
          <p>
            Creative Director & 3D Web Architect with **10 years of professional experience** crafting high-end digital products, real-time WebGL graphics, and immersive interactive design systems for global brands.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-3 font-mono">Core Competencies</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Three.js / React Three Fiber', 'TypeScript / Next.js / Vite',
              'GLSL Shaders & Post-processing', 'TailwindCSS & Modern UI/UX',
              '3D Asset Optimization (Blender)', 'Real-time Audio & Motion Animation'
            ].map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-800/30 px-3 py-2 rounded-lg border border-slate-700/40 text-xs text-slate-200">
                <CheckCircle2 size={14} className="text-sky-400 shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sky-500/10 via-slate-800/50 to-transparent rounded-xl border border-sky-500/30">
            <div>
              <p className="font-semibold text-white">Official A4 Document (.PDF)</p>
              <p className="text-xs text-slate-400">Includes complete project history, education, and technical certifications</p>
            </div>
            <a
              href="#download-cv"
              onClick={(e) => { e.preventDefault(); alert('Starting full CV download (.PDF)...'); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-sky-500/20 transition cursor-pointer"
            >
              <Download size={15} />
              <span>Download .PDF</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalLanyard({ onClose }: { onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);

  const socials = [
    {
      title: 'STUDENT · PORTFOLIO',
      name: 'GitHub',
      desc: 'code · open source',
      icon: <Github size={84} strokeWidth={1.2} />,
      gradient: 'from-slate-900 via-[#131c2e] to-[#0a0f1d]',
      borderColor: 'border-sky-500/40',
      linkText: 'kết nối →',
      link: 'https://github.com/psy-zney'
    },
    {
      title: 'STUDENT · PORTFOLIO',
      name: 'Facebook',
      desc: 'social · personal profile',
      icon: <Facebook size={84} strokeWidth={1.2} />,
      gradient: 'from-blue-950 via-[#102a6c] to-[#0a0f1d]',
      borderColor: 'border-blue-500/40',
      linkText: 'kết nối →',
      link: 'https://www.facebook.com/psyotic.zney/'
    },
    {
      title: 'STUDENT · PORTFOLIO',
      name: 'LinkedIn',
      desc: 'career · professional network',
      icon: <Share2 size={84} strokeWidth={1.2} />,
      gradient: 'from-sky-950 via-[#0e3b6c] to-[#0a0f1d]',
      borderColor: 'border-sky-400/40',
      linkText: 'kết nối →',
      link: 'https://www.linkedin.com/in/psy-zney295'
    },
    {
      title: 'STUDENT · PORTFOLIO',
      name: 'Email Contact',
      desc: 'lequangkhanh295@gmail.com',
      icon: <Mail size={84} strokeWidth={1.2} />,
      gradient: 'from-emerald-950 via-[#043327] to-[#0a0f1d]',
      borderColor: 'border-emerald-400/40',
      linkText: 'gửi mail →',
      link: 'mailto:lequangkhanh295@gmail.com'
    },
    {
      title: 'STUDENT · PORTFOLIO',
      name: 'Zalo Chat',
      desc: 'phone · 0394426827',
      icon: <MessageCircle size={84} strokeWidth={1.2} />,
      gradient: 'from-indigo-950 via-[#281b6c] to-[#0a0f1d]',
      borderColor: 'border-indigo-400/40',
      linkText: 'nhắn zalo →',
      link: 'https://zalo.me/0394426827'
    }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 w-full max-w-md mx-auto select-none">
      {/* Top Header: Minimalist // social links + round Close X button */}
      <div className="w-[340px] sm:w-[360px] flex items-center justify-between mb-4 px-2">
        <span className="font-mono text-sm text-slate-300 tracking-wider">// social links</span>
        <button
          onClick={onClose}
          className="w-10 h-10 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full border border-slate-700/80 shadow-lg flex items-center justify-center transition cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      {/* VERTICAL CARD STACK (Thẻ dọc xếp lồng như bộ bài trong Screenshot 2) */}
      <div className="relative h-[500px] w-[340px] sm:w-[360px] flex items-center justify-center my-2">
        {socials.map((soc, idx) => {
          const offset = idx - activeIdx;
          const isCurrent = offset === 0;

          let cardStyle = "translate-x-0 translate-y-0 scale-100 rotate-0 z-30 opacity-100 shadow-[0_25px_60px_rgba(0,0,0,0.9)] ring-1 ring-white/20 pointer-events-auto";
          if (offset === 1 || offset === -3) {
            cardStyle = "translate-x-6 sm:translate-x-8 translate-y-3 scale-95 rotate-4 z-20 opacity-75 hover:opacity-95 cursor-pointer pointer-events-auto shadow-2xl";
          } else if (offset === 2 || offset === -2) {
            cardStyle = "translate-x-12 sm:translate-x-16 translate-y-6 scale-90 rotate-8 z-10 opacity-50 hover:opacity-75 cursor-pointer pointer-events-auto shadow-xl";
          } else if (offset === 3 || offset === -1) {
            cardStyle = "translate-x-18 sm:translate-x-24 translate-y-9 scale-85 rotate-12 z-0 opacity-25 hover:opacity-50 cursor-pointer pointer-events-auto shadow-lg";
          }

          return (
            <div
              key={idx}
              onClick={() => !isCurrent && setActiveIdx(idx)}
              className={`absolute top-0 w-full h-full rounded-3xl bg-gradient-to-b ${soc.gradient} border ${soc.borderColor} p-8 flex flex-col justify-between transition-all duration-500 ease-out backdrop-blur-2xl ${cardStyle}`}
            >
              {/* Top Card Header */}
              <div className="flex items-center justify-between font-mono text-xs text-slate-400 tracking-widest font-semibold">
                <span>{soc.title}</span>
                <span>0{idx + 1}</span>
              </div>

              {/* Center Huge Icon */}
              <div className="my-auto py-6 flex justify-center text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                {soc.icon}
              </div>

              {/* Bottom Info & Link */}
              <div className="flex flex-col text-left">
                <h4 className="text-3xl font-extrabold text-white tracking-wide mb-1">{soc.name}</h4>
                <p className="text-xs font-mono text-slate-300 tracking-wider lowercase mb-6">{soc.desc}</p>
                <a
                  href={soc.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-white hover:text-sky-400 underline underline-offset-8 decoration-white/40 hover:decoration-sky-400 transition cursor-pointer pb-1 w-fit"
                >
                  <span>{soc.linkText}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls (< 1 / 4 >) */}
      <div className="flex items-center justify-center gap-8 mt-6">
        <button
          onClick={() => setActiveIdx((prev) => (prev - 1 + socials.length) % socials.length)}
          className="w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer shadow-lg font-bold"
        >
          &lt;
        </button>

        <span className="font-mono text-sm text-sky-400 font-bold tracking-widest">
          {activeIdx + 1} / {socials.length}
        </span>

        <button
          onClick={() => setActiveIdx((prev) => (prev + 1) % socials.length)}
          className="w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer shadow-lg font-bold"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

function ModalBookshelf({ onClose }: { onClose: () => void }) {
  const repos = [
    { name: '3D-Desk-Workspace-Portfolio', stars: '1.4k', forks: '280', lang: 'TypeScript / Three.js', desc: 'Interactive real-time 3D desk portfolio built with React Three Fiber & WebGL.' },
    { name: 'AI-Autonomous-Agent-Engine', stars: '950', forks: '140', lang: 'Python / LLM', desc: 'Autonomous AI software architecture and codebase analysis engine.' },
    { name: 'Cyberpunk-Neon-Shader-Lib', stars: '820', forks: '110', lang: 'GLSL / WebGL', desc: 'Lightweight real-time neon lighting and GLSL post-processing shader library.' },
    { name: 'Next-Quantum-UI-Design-System', stars: '1.1k', forks: '190', lang: 'React / TailwindCSS', desc: 'Agency-grade glassmorphic design system for modern enterprise dashboards.' }
  ];

  return (
    <div className="bg-slate-900/95 border border-purple-500/40 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-[0_0_50px_rgba(168,85,247,0.2)] backdrop-blur-xl text-slate-100 animate-in fade-in zoom-in duration-200 max-h-[85vh] overflow-y-auto">
      <div className="flex justify-between items-start border-b border-slate-700/80 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <BookOpen size={28} />
          </div>
          <div>
            <h3 className="text-xl font-bold tracking-wide text-white">OPEN SOURCE PROJECTS & REPOS</h3>
            <p className="text-xs text-purple-400 font-mono mt-0.5">Bookshelf Archive - GitHub Repositories</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {repos.map((repo, idx) => (
          <div key={idx} className="p-4 bg-slate-800/40 hover:bg-slate-800/80 rounded-xl border border-slate-700/60 transition group">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 font-bold text-sm text-purple-300 group-hover:text-purple-200">
                <Code2 size={16} />
                <span>{repo.name}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1 text-amber-400"><Star size={13} fill="currentColor" /> {repo.stars}</span>
                <span className="flex items-center gap-1 text-slate-400"><GitFork size={13} /> {repo.forks}</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">{repo.desc}</p>
            <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/40 pt-2.5">
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-mono">{repo.lang}</span>
              <a href={`https://github.com/psy-zney/${repo.name}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sky-400 hover:underline">
                <span>View Source</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InitialPageLoader({ onFinish }: { onFinish: () => void }) {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);

  const progressRef = useRef(progress);
  const activeRef = useRef(active);
  const onFinishRef = useRef(onFinish);
  progressRef.current = progress;
  activeRef.current = active;
  onFinishRef.current = onFinish;

  useEffect(() => {
    const MIN_DURATION = 2400; // Ensure at least 2.4s of smooth counting
    const TICK = 16;           // ~60fps
    const startTime = performance.now();
    let displayed = 0;
    let finished = false;

    const timer = setInterval(() => {
      if (finished) return;

      const elapsed = performance.now() - startTime;
      const timeRatio = Math.min(1, elapsed / MIN_DURATION);
      // Cubic ease-out: rapid start, gentle deceleration
      const easedTime = 1 - Math.pow(1 - timeRatio, 3);
      const simulated = easedTime * 100;

      // Only consider real loading complete after 1000ms OR if explicitly reaching 100%
      const isRealLoaded = progressRef.current >= 100 || (elapsed > 1000 && !activeRef.current && progressRef.current > 0) || (elapsed > 3500 && !activeRef.current);
      
      const target = isRealLoaded ? Math.max(simulated, progressRef.current) : Math.min(98, Math.max(simulated, progressRef.current));
      
      // Smoothly step displayed toward target
      displayed = Math.min(100, displayed + Math.max(0.5, (target - displayed) * 0.15));
      
      if (isRealLoaded && elapsed >= MIN_DURATION && displayed >= 99.2) {
        displayed = 100;
        finished = true;
        clearInterval(timer);
        setTimeout(() => onFinishRef.current(), 350);
      }
      
      setDisplayProgress(displayed);
    }, TICK);

    return () => { clearInterval(timer); finished = true; };
  }, []);

  // Generate stable star positions once
  const stars = useRef(
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() < 0.7 ? 1 : 1.5,
      delay: `${(Math.random() * 4).toFixed(2)}s`,
      duration: `${(2 + Math.random() * 3).toFixed(2)}s`,
    }))
  ).current;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Star particles */}
      {stars.map((s) => (
        <span
          key={s.id}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: '#ffffff',
            opacity: 0.15,
            animation: `twinkle ${s.duration} ${s.delay} ease-in-out infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Loader content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          minWidth: '320px',
          maxWidth: '90vw',
        }}
      >
        {/* Wave text loader */}
        <div className="loader" />

        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(255,255,255,0.12)',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <div
            style={{
              height: '1px',
              background: '#ffffff',
              width: `${displayProgress}%`,
              transition: 'none',
            }}
          />
          {/* Glowing head of progress bar */}
          <div
            style={{
              position: 'absolute',
              top: '-3px',
              left: `${displayProgress}%`,
              width: '4px',
              height: '7px',
              background: '#ffffff',
              borderRadius: '2px',
              boxShadow: '0 0 8px 2px rgba(255,255,255,0.6)',
              transform: 'translateX(-50%)',
              transition: 'none',
            }}
          />
        </div>

        {/* Percentage */}
        <span
          style={{
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.35)',
            textTransform: 'uppercase',
          }}
        >
          {displayProgress.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

interface ModelAnalyzerProps {
  onBackToIntro?: () => void;
  lang?: 'vie' | 'eng';
}

export function ModelAnalyzer({ onBackToIntro, lang = 'vie' }: ModelAnalyzerProps) {
  const povPosition: [number, number, number] = [5.0, 10.0, 0.5];
  const [hoveredItem, setHoveredItem] = useState<ItemType | null>(null);
  const [activeModal, setActiveModal] = useState<ItemType | null>(null);
  const [isAppLoading, setIsAppLoading] = useState(true);

  return (
    <div
      className="w-full h-full relative bg-gradient-to-b from-[#0f141d] via-[#141a26] to-[#0c1017]"
      onMouseLeave={() => {
        setHoveredItem(null);
        document.body.style.cursor = 'grab';
      }}
    >
      {isAppLoading && <InitialPageLoader onFinish={() => setIsAppLoading(false)} />}
      
      {/* Top Left Button: Return to Intro Landing Page */}
      {onBackToIntro && !isAppLoading && (
        <button
          onClick={onBackToIntro}
          className="absolute top-6 left-6 z-40 px-4 py-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center gap-2 text-xs font-mono font-bold transition-all duration-300 cursor-pointer hover:scale-105"
        >
          <span>←</span>
          <span>{lang === 'eng' ? 'Back to Intro' : 'Trang Giới Thiệu'}</span>
        </button>
      )}

      <Canvas
        shadows
        camera={{ position: povPosition, fov: 50, near: 0.1, far: 200 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerMissed={() => {
          setHoveredItem(null);
          document.body.style.cursor = 'grab';
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[15, 25, 15]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#60a5fa" />
        <pointLight position={[10, 5, -10]} intensity={0.5} color="#f59e0b" />

        <React.Suspense fallback={<Loader />}>
          <ModelContent
            hoveredItem={hoveredItem}
            onHoverItem={setHoveredItem}
            onSelectItem={(item) => {
              setActiveModal(item);
              if (item) setHoveredItem(null);
            }}
            activeModal={activeModal}
          />
          <ContactShadows position={[0, -0.01, 0]} opacity={0.6} scale={40} blur={2} far={10} />
          <Environment preset="city" />
        </React.Suspense>

        <POVControls headPosition={povPosition} lookTarget={[1.5, 9.5, 0]} />
      </Canvas>

      {/* MODAL OVERLAYS */}
      {activeModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          {activeModal === 'paper' && <ModalCV onClose={() => setActiveModal(null)} />}
          {activeModal === 'lanyard' && <ModalLanyard onClose={() => setActiveModal(null)} />}
          {activeModal === 'bookshelf' && <ModalBookshelf onClose={() => setActiveModal(null)} />}
        </div>
      )}
    </div>
  );
}

