import { ArrowUp, ArrowUpRight, Church } from "lucide-react";
import { CHURCH_INFO } from "../../data/churchInfo";

export const Footer = ({
  onPlanVisitClick,
}: {
  onPlanVisitClick: () => void;
}) => (
  <footer className="site-footer">
    <div className="page-container">
      <div className="footer-top">
        <a className="church-brand" href="#home">
          <span className="brand-mark">
            <Church size={28} strokeWidth={1.4} />
          </span>
          <span>
            <strong>
              Daet Presbyterian<span>Church</span>
            </strong>
            <small>ROOTED IN GRACE · UNITED IN CHRIST</small>
          </span>
        </a>
        <p>
          Rooted in grace. Growing in faith.
          <br />
          United in Christ.
        </p>
        <nav aria-label="Footer navigation">
          <a href="#about">Our church</a>
          <a href="#ministries">Ministries</a>
          <a href="#events">Church life</a>
          <button onClick={onPlanVisitClick}>
            Plan a visit <ArrowUpRight size={14} />
          </button>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {CHURCH_INFO.name}. All rights reserved.
        </span>
        <div>
          <a
            href={CHURCH_INFO.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook <ArrowUpRight size={13} />
          </a>
          <a
            href={CHURCH_INFO.contact.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube <ArrowUpRight size={13} />
          </a>
          <a href="#home" aria-label="Back to top">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);
