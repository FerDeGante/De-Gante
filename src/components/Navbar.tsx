"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Image src="/images/logo_dg.png" alt="Logo DG" width={40} height={40} />
        <span>Fernando De Gante</span>
      </div>
      <div>
        <Link href="#proyectos">Proyectos</Link>
        <Link href="#participaciones">Participaciones</Link>
        <Link href="#servicios">Servicios</Link>
        <Link href="#contacto">Contacto</Link>
      </div>
    </nav>
  );
}
