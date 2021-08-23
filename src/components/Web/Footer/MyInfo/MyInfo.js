import React from "react";
import Logo from "../../../../assets/img/png/logo-izq-proguias-san-pedro.png";
import SocialLink from "../../SocialLinks";

import "./MyInfo.scss";

export default function MyInfo() {
  return (
    <div className="my-info">
      <img src={Logo} alt="Pro Guías San Pedro de Atacama" />
      <h4>
        Amplía tus conocimientos como Guía, únete a una comunidad de Guías certificados en San Pedro y obten los cursos más nuevos.
      </h4>
      <SocialLink />
    </div>
  );
}
