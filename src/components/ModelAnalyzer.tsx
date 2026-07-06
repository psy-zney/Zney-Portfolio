import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, useProgress, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { DesktopOverlay } from './DesktopOverlay';
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

export type ItemType = 'paper' | 'lanyard' | 'bookshelf' | 'screen';

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
  },
  screen: {
    title: 'Interactive desktop',
    buttonText: 'Screen',
    color: '#8b5cf6',
    bgGlow: 'rgba(139, 92, 246, 0.28)'
  }
};

function getItemType(name: string): ItemType | null {
  const n = name.toLowerCase();
  if (n.includes('my_screen')) return 'screen';
  if (n.includes('paper') || n.includes('note') || n.includes('stackofpaper')) return 'paper';
  if (n.includes('lanyard') || n.includes('key') || n.includes('card') || n.includes('id_')) return 'lanyard';
  if (n.includes('book') || n.includes('shelf') || n.includes('bookshelf')) return 'bookshelf';
  return null;
}

function SpaceBackground() {
  const texture = useTexture('./deep-space-panorama.png');
  const { scene } = useThree();

  useEffect(() => {
    const previous = scene.background;
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    scene.background = texture;
    return () => {
      scene.background = previous;
    };
  }, [scene, texture]);

  return null;
}

function TwinklingStars({ count = 260 }: { count?: number }) {
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const positions = React.useMemo(() => {
    const values = new Float32Array(count * 3);
    let seed = 295;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    for (let index = 0; index < count; index += 1) {
      const radius = 54 + random() * 38;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      values[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[index * 3 + 1] = radius * Math.cos(phi);
      values[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return values;
  }, [count]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.opacity = 0.38 + Math.sin(clock.elapsedTime * 0.92) * 0.16;
    }
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color="#ffffff"
        size={0.075}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

function OutlineEffect({ selectedObject, color }: { selectedObject: THREE.Object3D | null; color: string }) {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<EffectComposer | null>(null);
  const outlineRef = useRef<OutlinePass | null>(null);

  useEffect(() => {
    const composer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    const outlinePass = new OutlinePass(new THREE.Vector2(size.width, size.height), scene, camera);
    outlinePass.edgeStrength = 3.2;
    outlinePass.edgeGlow = 0.65;
    outlinePass.edgeThickness = 1.1;
    outlinePass.pulsePeriod = 0;
    outlinePass.hiddenEdgeColor.set('#24114f');
    composer.addPass(renderPass);
    composer.addPass(outlinePass);
    composer.setSize(size.width, size.height);
    composerRef.current = composer;
    outlineRef.current = outlinePass;

    return () => {
      outlinePass.dispose();
      composer.dispose();
      composerRef.current = null;
      outlineRef.current = null;
    };
  }, [camera, gl, scene, size.height, size.width]);

  useEffect(() => {
    if (!outlineRef.current) return;
    outlineRef.current.selectedObjects = selectedObject ? [selectedObject] : [];
    outlineRef.current.visibleEdgeColor.set(color);
  }, [selectedObject, color]);

  useFrame((_, delta) => composerRef.current?.render(delta), 1);
  return null;
}
function WaveLoaderText({ className = '' }: { className?: string }) {
  return <div className={'wave-loader ' + className} aria-hidden="true" />;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center p-8 bg-slate-950/95 backdrop-blur-2xl rounded-3xl border border-sky-500/30 shadow-[0_0_50px_rgba(56,189,248,0.2)] text-white min-w-[340px] pointer-events-none select-none">
        <WaveLoaderText className="mb-4" />
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
  sensitivity = 0.0008,
  zoomed = false,
  focusPoint = null,
  focusSize = 2,
  onZoomComplete
}: {
  headPosition?: [number, number, number];
  lookTarget?: [number, number, number];
  sensitivity?: number;
  zoomed?: boolean;
  focusPoint?: THREE.Vector3 | null;
  focusSize?: number;
  onZoomComplete?: () => void;
}) {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const isTransitioning = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const animatedTarget = useRef(new THREE.Vector3(...lookTarget));
  const controlsMountedRef = useRef(false);
  const transitionRef = useRef<{
    startPosition: THREE.Vector3;
    endPosition: THREE.Vector3;
    startTarget: THREE.Vector3;
    endTarget: THREE.Vector3;
    startTime: number;
    duration: number;
    complete?: () => void;
  } | null>(null);

  const initialAngles = React.useMemo(() => {
    const dx = lookTarget[0] - headPosition[0];
    const dy = lookTarget[1] - headPosition[1];
    const dz = lookTarget[2] - headPosition[2];
    const horizDist = Math.sqrt(dx * dx + dz * dz);
    return {
      yaw: Math.atan2(-dx, -dz),
      pitch: Math.atan2(dy, horizDist)
    };
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
    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || zoomed || isTransitioning.current) return;
      isDragging.current = true;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
      try { domElement.setPointerCapture(event.pointerId); } catch { }
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (!isDragging.current || zoomed || isTransitioning.current) return;
      const deltaX = event.clientX - previousMousePosition.current.x;
      const deltaY = event.clientY - previousMousePosition.current.y;
      previousMousePosition.current = { x: event.clientX, y: event.clientY };
      targetYaw.current += deltaX * sensitivity;
      targetPitch.current += deltaY * sensitivity;
      targetYaw.current = Math.max(initialAngles.yaw - Math.PI / 1.3, Math.min(initialAngles.yaw + Math.PI / 1.3, targetYaw.current));
      targetPitch.current = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 3, targetPitch.current));
    };
    const handlePointerUp = (event: PointerEvent) => {
      isDragging.current = false;
      try { domElement.releasePointerCapture(event.pointerId); } catch { }
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
  }, [gl, initialAngles, sensitivity, zoomed]);

  useEffect(() => {
    if (!controlsMountedRef.current) {
      controlsMountedRef.current = true;
      camera.position.set(headPosition[0], headPosition[1], headPosition[2]);
      animatedTarget.current.set(lookTarget[0], lookTarget[1], lookTarget[2]);
      camera.lookAt(animatedTarget.current);
      return;
    }
    if (zoomed && !focusPoint) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reducedMotion ? 0.01 : 1.5;
    const home = new THREE.Vector3(...headPosition);
    const homeTarget = new THREE.Vector3(...lookTarget);
    const destinationTarget = zoomed && focusPoint ? focusPoint.clone() : homeTarget;
    const direction = home.clone().sub(destinationTarget).normalize();
    const destination = zoomed && focusPoint
      ? destinationTarget.clone().add(direction.multiplyScalar(Math.max(1.1, focusSize * 0.52)))
      : home;

    isTransitioning.current = true;
    isDragging.current = false;
    transitionRef.current = {
      startPosition: camera.position.clone(),
      endPosition: destination,
      startTarget: animatedTarget.current.clone(),
      endTarget: destinationTarget,
      startTime: performance.now(),
      duration: duration * 1000,
      complete: zoomed ? onZoomComplete : undefined
    };

    return () => {
      transitionRef.current = null;
    };
  }, [camera, focusPoint, focusSize, headPosition, lookTarget, onZoomComplete, zoomed]);

  useFrame((_, delta) => {
    const transition = transitionRef.current;
    if (transition) {
      const linear = Math.min(1, (performance.now() - transition.startTime) / Math.max(1, transition.duration));
      const eased = linear < 0.5
        ? 2 * linear * linear
        : 1 - Math.pow(-2 * linear + 2, 2) / 2;
      camera.position.lerpVectors(transition.startPosition, transition.endPosition, eased);
      animatedTarget.current.lerpVectors(transition.startTarget, transition.endTarget, eased);
      camera.lookAt(animatedTarget.current);
      if (linear >= 1) {
        transitionRef.current = null;
        isTransitioning.current = false;
        transition.complete?.();
      }
      return;
    }

    if (zoomed) {
      camera.lookAt(animatedTarget.current);
      return;
    }

    camera.position.set(headPosition[0], headPosition[1], headPosition[2]);
    const smoothing = 1 - Math.exp(-Math.min(delta, 0.05) * 14);
    currentYaw.current = THREE.MathUtils.lerp(currentYaw.current, targetYaw.current, smoothing);
    currentPitch.current = THREE.MathUtils.lerp(currentPitch.current, targetPitch.current, smoothing);
    const euler = new THREE.Euler(currentPitch.current, currentYaw.current, 0, 'YXZ');
    camera.quaternion.setFromEuler(euler);
  });

  return null;
}

interface ModelContentProps {
  hoveredItem: ItemType | null;
  onHoverItem: (item: ItemType | null) => void;
  onHoverObject: (object: THREE.Object3D | null) => void;
  onSelectItem: (item: ItemType) => void;
  activeModal: ItemType | null;
  interactionsDisabled: boolean;
}

function ModelContent({ hoveredItem, onHoverItem, onHoverObject, onSelectItem, activeModal, interactionsDisabled }: ModelContentProps) {
  const gltf = useGLTF('./main.glb');
  const modelGroupRef = useRef<THREE.Group>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const pointerDraggedRef = useRef(false);

  const [itemPositions, setItemPositions] = useState<Record<ItemType, THREE.Vector3>>({
    paper: new THREE.Vector3(14.6, 0.8, 0.5),
    lanyard: new THREE.Vector3(0.0, 0.15, 0.0),
    bookshelf: new THREE.Vector3(-2.0, 3.2, -1.0),
    screen: new THREE.Vector3(1.5, 9.4, -0.2)
  });

  useEffect(() => {
    if (!gltf.scene) return;
    const newPos: Record<ItemType, THREE.Vector3> = {
      paper: new THREE.Vector3(14.6, 0.8, 0.5),
      lanyard: new THREE.Vector3(0.0, 0.15, 0.0),
      bookshelf: new THREE.Vector3(-2.0, 3.2, -1.0),
      screen: new THREE.Vector3(1.5, 9.4, -0.2)
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

  // Keep a restrained emissive lift under the post-processing outline.
  useEffect(() => {
    if (!gltf.scene) return;
    gltf.scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat || !mesh.userData.origEmissive) return;
      const itemType = getItemType(mesh.name)
        || getItemType(mesh.parent?.name || '')
        || getItemType(mesh.parent?.parent?.name || '');

      mat.emissive.copy(mesh.userData.origEmissive);
      mat.emissiveIntensity = mesh.userData.origEmissiveIntensity;
      if (itemType && itemType === hoveredItem && !activeModal && !interactionsDisabled) {
        mat.emissive.set(ITEM_CONFIG[itemType].color);
        mat.emissiveIntensity = 0.1;
      }
    });
  }, [hoveredItem, activeModal, interactionsDisabled, gltf.scene]);

  const handlePointerDown = (e: any) => {
    if (activeModal || interactionsDisabled || e.button !== 0) return;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    pointerDraggedRef.current = false;
  };

  const handlePointerMove = (e: any) => {
    if (activeModal || interactionsDisabled) return;
    const start = pointerStartRef.current;
    if (start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > 5) {
      pointerDraggedRef.current = true;
    }
    if (pointerDraggedRef.current || (typeof e.delta === 'number' && e.delta > 5)) {
      e.stopPropagation();
      onHoverItem(null);
      onHoverObject(null);
      document.body.style.cursor = 'grabbing';
      return;
    }
    e.stopPropagation();
    const hitMesh = e.object;
    const itemType = getItemType(hitMesh.name) || getItemType(hitMesh.parent?.name || '') || getItemType(hitMesh.parent?.parent?.name || '');
    if (itemType !== hoveredItem) {
      onHoverItem(itemType);
      onHoverObject(itemType ? hitMesh : null);
      document.body.style.cursor = itemType ? 'pointer' : 'grab';
    }
  };

  const handlePointerOver = (e: any) => {
    if (activeModal || interactionsDisabled) return;
    e.stopPropagation();
    const hitMesh = e.object;
    const itemType = getItemType(hitMesh.name) || getItemType(hitMesh.parent?.name || '') || getItemType(hitMesh.parent?.parent?.name || '');
    if (itemType) {
      onHoverItem(itemType);
      onHoverObject(hitMesh);
      document.body.style.cursor = 'pointer';
    } else {
      onHoverItem(null);
      onHoverObject(null);
      document.body.style.cursor = 'grab';
    }
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    onHoverItem(null);
    onHoverObject(null);
    document.body.style.cursor = 'grab';
  };

  const handleClick = (e: any) => {
    if (activeModal || interactionsDisabled) return;
    e.stopPropagation();
    pointerStartRef.current = null;
    if (pointerDraggedRef.current || (typeof e.delta === 'number' && e.delta > 5)) {
      pointerDraggedRef.current = false;
      return;
    }
    const hitMesh = e.object;
    const itemType = getItemType(hitMesh.name) || getItemType(hitMesh.parent?.name || '') || getItemType(hitMesh.parent?.parent?.name || '');
    if (itemType) {
      onSelectItem(itemType);
    }
  };

  return (
    <group ref={modelGroupRef} onPointerDown={interactionsDisabled ? undefined : handlePointerDown} onPointerMove={interactionsDisabled ? undefined : handlePointerMove} onPointerOver={interactionsDisabled ? undefined : handlePointerOver} onPointerOut={interactionsDisabled ? undefined : handlePointerOut} onClick={interactionsDisabled ? undefined : handleClick}>
      <primitive object={gltf.scene} />

      {/* Ultra-compact minimalist labels hugging objects (Ẩn toàn bộ khi đang mở bất kỳ modal nào) */}
      {!activeModal && !interactionsDisabled && (Object.keys(ITEM_CONFIG) as ItemType[]).map((key) => {
        const pos = itemPositions[key];
        const isHovered = hoveredItem === key;
        const config = ITEM_CONFIG[key];

        return (
          <Html
            key={key}
            position={[pos.x, pos.y, pos.z]}
            center
            distanceFactor={key === 'screen' ? 5 : 12}
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
              className={`flex items-center rounded-md font-sans font-semibold transition-all duration-200 cursor-pointer select-none whitespace-nowrap backdrop-blur-md border shadow-md ${key === 'screen' ? 'gap-1 px-1 py-px text-[8px]' : 'gap-1.5 px-2.5 py-1 text-[11px]'} ${isHovered
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
  const progressRef = useRef(progress);
  const activeRef = useRef(active);
  const onFinishRef = useRef(onFinish);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  progressRef.current = progress;
  activeRef.current = active;
  onFinishRef.current = onFinish;

  useEffect(() => {
    const MIN_VISIBLE_MS = 1400;
    const COMPLETION_HOLD_MS = 260;
    const introAudio = new Audio('./Intro.mp3');
    introAudio.preload = 'auto';
    introAudio.loop = true;
    introAudio.volume = 0;
    const startTime = performance.now();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrame = 0;
    let completionTimer = 0;
    let previousTime = startTime;
    let displayed = 0;
    let trackWidth = trackRef.current?.clientWidth ?? 0;
    let lastRounded = -1;
    let finished = false;
    let audioStarted = false;
    let audioFadeFrame = 0;

    const fadeAudioTo = (target: number, duration: number) => {
      window.cancelAnimationFrame(audioFadeFrame);
      const from = introAudio.volume;
      const fadeStart = performance.now();
      const updateVolume = (now: number) => {
        const fadeProgress = Math.min(1, (now - fadeStart) / Math.max(1, duration));
        introAudio.volume = from + (target - from) * fadeProgress;
        if (fadeProgress < 1) audioFadeFrame = window.requestAnimationFrame(updateVolume);
      };
      audioFadeFrame = window.requestAnimationFrame(updateVolume);
    };

    const startIntroAudio = () => {
      if (audioStarted) return;
      void introAudio.play()
        .then(() => {
          if (finished) {
            introAudio.pause();
            return;
          }
          audioStarted = true;
          window.removeEventListener('pointerdown', startIntroAudio);
          window.removeEventListener('keydown', startIntroAudio);
          fadeAudioTo(0.42, 420);
        })
        .catch(() => undefined);
    };

    window.addEventListener('pointerdown', startIntroAudio, { once: true });
    window.addEventListener('keydown', startIntroAudio, { once: true });
    startIntroAudio();

    const resizeObserver = new ResizeObserver((entries) => {
      trackWidth = entries[0]?.contentRect.width ?? trackRef.current?.clientWidth ?? 0;
    });
    if (trackRef.current) resizeObserver.observe(trackRef.current);

    const paint = (value: number) => {
      const normalized = Math.max(0, Math.min(100, value));
      fillRef.current?.style.setProperty('transform', 'scaleX(' + normalized / 100 + ')');
      headRef.current?.style.setProperty('transform', 'translate3d(' + (trackWidth * normalized / 100) + 'px, -50%, 0)');
      trackRef.current?.setAttribute('aria-valuenow', String(Math.round(normalized)));

      const rounded = Math.round(normalized);
      if (percentRef.current && rounded !== lastRounded) {
        percentRef.current.textContent = rounded + '%';
        lastRounded = rounded;
      }
    };

    const animate = (now: number) => {
      if (finished) return;

      const delta = Math.min(64, Math.max(0, now - previousTime));
      previousTime = now;
      const elapsed = now - startTime;
      const actual = Math.max(0, Math.min(100, progressRef.current));
      const complete = !activeRef.current && actual >= 99.9;

      let target = actual;
      if (activeRef.current) target = Math.min(target, 99.4);
      if (complete && elapsed < MIN_VISIBLE_MS) target = Math.min(target, 96);

      const responseMs = complete ? 105 : 180;
      const smoothing = reducedMotion ? 1 : 1 - Math.exp(-delta / responseMs);
      displayed += (target - displayed) * smoothing;

      if (complete && elapsed >= MIN_VISIBLE_MS && 100 - displayed < 0.08) {
        displayed = 100;
      }

      paint(displayed);

      if (displayed >= 99.99 && complete && elapsed >= MIN_VISIBLE_MS) {
        finished = true;
        fadeAudioTo(0, COMPLETION_HOLD_MS);
        completionTimer = window.setTimeout(() => onFinishRef.current(), COMPLETION_HOLD_MS);
        return;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    paint(0);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      finished = true;
      window.cancelAnimationFrame(animationFrame);
      window.cancelAnimationFrame(audioFadeFrame);
      window.clearTimeout(completionTimer);
      window.removeEventListener('pointerdown', startIntroAudio);
      window.removeEventListener('keydown', startIntroAudio);
      introAudio.pause();
      introAudio.currentTime = 0;
      resizeObserver.disconnect();
    };
  }, []);

  const stars = useRef(
    Array.from({ length: 60 }, (_, index) => ({
      id: index,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      size: Math.random() < 0.7 ? 1 : 1.5,
      delay: (Math.random() * 4).toFixed(2) + 's',
      duration: (2 + Math.random() * 3).toFixed(2) + 's',
    }))
  ).current;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: '#050507',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {stars.map((star) => (
        <span
          key={star.id}
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: star.size + 'px',
            height: star.size + 'px',
            borderRadius: '50%',
            background: '#f7f5fb',
            opacity: 0.15,
            animation: 'twinkle ' + star.duration + ' ' + star.delay + ' ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      ))}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
          width: 'min(360px, 82vw)',
        }}
      >
        <WaveLoaderText />

        <div
          ref={trackRef}
          role="progressbar"
          aria-label="Loading 3D workspace"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          className="scene-progress-track"
        >
          <div ref={fillRef} className="scene-progress-fill" />
          <div ref={headRef} className="scene-progress-head" />
        </div>

        <span ref={percentRef} className="scene-progress-value" aria-live="polite">
          0%
        </span>
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

function ScreenEntryTransition({ lang }: { lang: 'vie' | 'eng' }) {
  return (
    <div className="screen-entry-transition" role="status" aria-live="polite">
      <div className="screen-entry-panel">
        <span className="screen-entry-label">DISPLAY LINK</span>
        <strong>{lang === 'vie' ? 'Đang mở workspace' : 'Opening workspace'}</strong>
        <div className="screen-entry-bars" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </div>
        <div className="screen-entry-line" aria-hidden="true"><span /></div>
      </div>
    </div>
  );
}

interface ModelAnalyzerProps {
  onBackToIntro?: () => void;
  lang?: 'vie' | 'eng';
}

export function ModelAnalyzer({ onBackToIntro, lang = 'eng' }: ModelAnalyzerProps) {
  const povPosition = React.useMemo<[number, number, number]>(() => [5.0, 10.0, 0.5], []);
  const lookTarget = React.useMemo<[number, number, number]>(() => [1.5, 9.5, 0], []);
  const [hoveredItem, setHoveredItem] = useState<ItemType | null>(null);
  const [outlineTarget, setOutlineTarget] = useState<THREE.Object3D | null>(null);
  const [activeModal, setActiveModal] = useState<ItemType | null>(null);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [screenTransitionActive, setScreenTransitionActive] = useState(false);
  const [screenOverlayVisible, setScreenOverlayVisible] = useState(false);
  const screenTransitionTimerRef = useRef(0);

  useEffect(() => {
    return () => window.clearTimeout(screenTransitionTimerRef.current);
  }, []);

  const handleSelectItem = React.useCallback((item: ItemType) => {
    setHoveredItem(null);
    setOutlineTarget(null);
    if (item === 'screen') {
      setActiveModal(null);
      setScreenOverlayVisible(false);
      setScreenTransitionActive(true);
      window.clearTimeout(screenTransitionTimerRef.current);
      const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 120 : 1050;
      screenTransitionTimerRef.current = window.setTimeout(() => {
        setScreenTransitionActive(false);
        setScreenOverlayVisible(true);
      }, duration);
      return;
    }
    setActiveModal(item);
  }, []);

  const exitScreen = React.useCallback(() => {
    setScreenOverlayVisible(false);
  }, []);

  const outlineColor = hoveredItem ? ITEM_CONFIG[hoveredItem].color : '#8b5cf6';

  return (
    <div
      className="w-full h-full relative bg-[#020204]"
      onMouseLeave={() => {
        setHoveredItem(null);
        setOutlineTarget(null);
        document.body.style.cursor = 'grab';
      }}
    >
      {isAppLoading && <InitialPageLoader onFinish={() => setIsAppLoading(false)} />}

      {onBackToIntro && !isAppLoading && !screenTransitionActive && !screenOverlayVisible && (
        <button
          onClick={onBackToIntro}
          className="absolute top-6 left-6 z-40 px-4 py-2.5 rounded-2xl bg-slate-950/85 hover:bg-slate-900 text-slate-200 hover:text-white border border-violet-400/30 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-xl flex items-center gap-2 text-xs font-mono font-bold transition-all duration-300 cursor-pointer hover:scale-105"
        >
          <span>←</span>
          <span>{lang === 'eng' ? 'Back to Intro' : 'Trang giới thiệu'}</span>
        </button>
      )}

      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: povPosition, fov: 50, near: 0.1, far: 200 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onPointerMissed={() => {
          setHoveredItem(null);
          setOutlineTarget(null);
          document.body.style.cursor = 'grab';
        }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[15, 25, 15]}
          intensity={1.25}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.55} color="#60a5fa" />
        <pointLight position={[10, 5, -10]} intensity={0.45} color="#8b5cf6" />

        <React.Suspense fallback={<Loader />}>
          <SpaceBackground />
          <TwinklingStars count={260} />
          <ModelContent
            hoveredItem={hoveredItem}
            onHoverItem={setHoveredItem}
            onHoverObject={setOutlineTarget}
            onSelectItem={handleSelectItem}
            activeModal={activeModal}
            interactionsDisabled={screenTransitionActive || screenOverlayVisible}
          />
          <ContactShadows position={[0, -0.01, 0]} opacity={0.55} scale={40} blur={2} far={10} />
          <Environment preset="city" />
        </React.Suspense>

        <POVControls headPosition={povPosition} lookTarget={lookTarget} />
        <OutlineEffect selectedObject={outlineTarget} color={outlineColor} />
      </Canvas>

      {activeModal && activeModal !== 'screen' && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          {activeModal === 'paper' && <ModalCV onClose={() => setActiveModal(null)} />}
          {activeModal === 'lanyard' && <ModalLanyard onClose={() => setActiveModal(null)} />}
          {activeModal === 'bookshelf' && <ModalBookshelf onClose={() => setActiveModal(null)} />}
        </div>
      )}

      {screenTransitionActive && <ScreenEntryTransition lang={lang} />}
      {screenOverlayVisible && <DesktopOverlay onExit={exitScreen} lang={lang} />}
    </div>
  );
}

useGLTF.preload('./main.glb');

