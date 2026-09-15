/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

const BOX_COUNT = 6;
const COPY_FPS = 20;
const COPY_WIDTH = 480;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D tBg;
  uniform vec4 uRect;
  uniform float uDistort;
  uniform float uAberration;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float radius = 0.18;
    vec2 q = abs(p) - vec2(1.0) + radius;
    float dist = min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - radius;
    if (dist > 0.002) discard;

    vec2 uv = uRect.xy + vUv * uRect.zw;
    uv += p * uDistort;

    float r = texture2D(tBg, uv + vec2(uAberration, 0.0)).r;
    float g = texture2D(tBg, uv).g;
    float b = texture2D(tBg, uv - vec2(uAberration, 0.0)).b;

    float edge = 1.0 - smoothstep(-0.02, 0.01, dist);
    float fresnel = pow(clamp(length(p), 0.0, 1.0), 3.0);
    vec3 color = vec3(r, g, b);
    color += vec3(0.16, 0.14, 0.24) * fresnel * 0.45;

    gl_FragColor = vec4(color, 0.82 * edge);
  }
`;

function makeCopyCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = COPY_WIDTH;
  canvas.height = Math.round(COPY_WIDTH * 0.56);
  return canvas;
}

function GlassPlanes() {
  const { camera, gl, viewport } = useThree();
  const meshRefs = useRef([]);
  const cardsRef = useRef([]);
  const etherCanvasRef = useRef(null);
  const copyCtxRef = useRef(null);
  const copyAccRef = useRef(0);

  const copyCanvas = useMemo(makeCopyCanvas, []);
  const texture = useMemo(() => {
    const tex = new THREE.CanvasTexture(copyCanvas);
    tex.generateMipmaps = false;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.colorSpace = THREE.NoColorSpace;
    tex.flipY = true;
    return tex;
  }, [copyCanvas]);

  const materials = useMemo(
    () =>
      Array.from({ length: BOX_COUNT }, () => {
        const mat = new THREE.ShaderMaterial({
          uniforms: {
            tBg: { value: texture },
            uRect: { value: new THREE.Vector4(0, 0, 1, 1) },
            uDistort: { value: 0.045 },
            uAberration: { value: 0.004 }
          },
          vertexShader,
          fragmentShader,
          transparent: true,
          depthWrite: false
        });
        return mat;
      }),
    [texture]
  );

  useEffect(() => {
    copyCtxRef.current = copyCanvas.getContext('2d', { alpha: false });
    const root = document.querySelector('.hero-bento');
    const collect = () => {
      cardsRef.current = [...document.querySelectorAll('.hero-bento .magic-bento-card')];
      etherCanvasRef.current = document.querySelector('.liquid-ether-container canvas');
    };
    collect();
    if (!root) return undefined;
    const observer = new ResizeObserver(collect);
    observer.observe(root);
    return () => {
      observer.disconnect();
      materials.forEach(mat => mat.dispose());
      texture.dispose();
    };
  }, [copyCanvas, materials, texture]);

  useFrame((_, delta) => {
    const glassCanvas = gl.domElement;
    const canvasRect = glassCanvas.getBoundingClientRect();
    if (!canvasRect.width || !canvasRect.height) return;

    const etherCanvas = etherCanvasRef.current;
    const ctx = copyCtxRef.current;
    copyAccRef.current += delta;
    if (ctx && etherCanvas && etherCanvas.width > 0 && copyAccRef.current >= 1 / COPY_FPS) {
      copyAccRef.current = 0;
      const ratio = etherCanvas.clientHeight / Math.max(1, etherCanvas.clientWidth);
      const h = Math.max(1, Math.round(COPY_WIDTH * ratio));
      if (copyCanvas.height !== h) copyCanvas.height = h;
      ctx.drawImage(etherCanvas, 0, 0, copyCanvas.width, copyCanvas.height);
      texture.needsUpdate = true;
    }

    const view = viewport.getCurrentViewport(camera, [0, 0, 15]);
    const etherRect = etherCanvas?.getBoundingClientRect();

    meshRefs.current.forEach((mesh, index) => {
      if (!mesh) return;
      const card = cardsRef.current[index];
      if (!card) {
        mesh.visible = false;
        return;
      }

      const rect = card.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) {
        mesh.visible = false;
        return;
      }

      const nx = ((rect.left + rect.width / 2 - canvasRect.left) / canvasRect.width) * 2 - 1;
      const ny = -((rect.top + rect.height / 2 - canvasRect.top) / canvasRect.height) * 2 + 1;
      mesh.visible = true;
      mesh.position.set((nx * view.width) / 2, (ny * view.height) / 2, 15);
      mesh.scale.set(
        (rect.width / canvasRect.width) * view.width,
        (rect.height / canvasRect.height) * view.height,
        1
      );

      if (etherRect?.width && materials[index]) {
        const u0 = (rect.left - etherRect.left) / etherRect.width;
        const v0 = 1 - (rect.bottom - etherRect.top) / etherRect.height;
        const du = rect.width / etherRect.width;
        const dv = rect.height / etherRect.height;
        materials[index].uniforms.uRect.value.set(u0, v0, du, dv);
      }
    });
  });

  return (
    <group>
      <ambientLight intensity={0} />
      {materials.map((material, index) => (
        <mesh
          key={index}
          ref={node => {
            meshRefs.current[index] = node;
          }}
          frustumCulled={false}
          material={material}
        >
          <planeGeometry args={[1, 1]} />
        </mesh>
      ))}
    </group>
  );
}

export default function GlassBento() {
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      dpr={1}
      frameloop="always"
      gl={{ alpha: true, antialias: false, powerPreference: 'high-performance', toneMapping: THREE.NoToneMapping }}
      style={{ background: 'transparent', pointerEvents: 'none', width: '100%', height: '100%' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <GlassPlanes />
    </Canvas>
  );
}
