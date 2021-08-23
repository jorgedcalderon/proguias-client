import React from "react";
import AcademyLogo from "../../../../assets/img/png/academy-logo.png";

import "./PresentationCourses.scss";

export default function PresentationCourses() {
  return (
    <div className="presentation-courses">
      <img src={AcademyLogo} alt="Cursos de Pro Guías" />
      <p>
        Cursos:
      </p>
      <p>¡¡¡Échales un vistazo y aprovecha las ofertas!!!</p>
    </div>
  );
}
