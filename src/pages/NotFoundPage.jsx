import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LiquidEther from '../components/LiquidEther';
import DotGrid from '../components/DotGrid';
import './NotFoundPage.css';

export default function NotFoundPage() {
  const [show404, setShow404] = useState(true);

  useEffect(() => {
    document.title = '404 · Abhinav Jain';
  }, []);

  return (
    <main className={`nf-page${show404 ? '' : ' nf-page--play'}`}>
      <div className="nf-ether" aria-hidden>
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={20}
          iterationsPoisson={20}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <div className={`nf-grid${show404 ? ' nf-grid--half' : ' nf-grid--full'}`} aria-hidden>
        <DotGrid
          dotSize={3}
          gap={22}
          baseColor="#4c1d95"
          activeColor="#a78bfa"
          proximity={140}
          shockRadius={320}
          shockStrength={6.5}
          resistance={450}
          returnDuration={1.5}
        />
      </div>

      {show404 ? (
        <section className="nf-panel" aria-labelledby="nf-title">
          <p className="nf-kicker">Lost</p>
          <h1 id="nf-title" className="nf-code">
            404
          </h1>
          <p className="nf-copy">This page isn’t here. The dots still are.</p>
          <div className="nf-actions">
            <button type="button" className="nf-btn nf-btn--primary" onClick={() => setShow404(false)}>
              Dismiss 404
            </button>
            <Link to="/" className="nf-btn nf-btn--ghost">
              Home
            </Link>
          </div>
        </section>
      ) : (
        <div className="nf-playbar">
          <Link to="/" className="nf-btn nf-btn--ghost">
            Home
          </Link>
        </div>
      )}
    </main>
  );
}
