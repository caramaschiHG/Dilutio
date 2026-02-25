<div align="center">

# Dilutio

**Enterprise-grade Pharmacotechnical UI & Calculation System**

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React PDF](https://img.shields.io/badge/React_PDF-FF0000?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](https://react-pdf.org/)

Developed and maintained by **Herbarium Genetics**.

</div>

## 📌 Overview

**Dilutio** is a highly specialized, rigorous software solution designed for pharmacotechnical laboratories. It acts as an operational standardizer to guarantee exact precision during the dilution and fractioning processes of extracted matrices.

Dilutio automates mathematically complex standardization parameters based on mass, volume, and concentration, mitigating the risk of calculation errors. In addition to providing live telemetry and status validation, Dilutio generates commercial-grade standard operating procedure (POP) dossiers ready for operational compliance and archiving.

## 🚀 Key Features

- **Matrix Standardization Engine**: Precision calculations that adapt to multiple directive modes:
  - Fix Mass → Calculate Volume
  - Fix Volume → Calculate Mass
  - Derive Final Concentration
- **Automated Clinical Fractioning**: Instantly computes target loads and vehicle additives for an arbitrary number of individual prescriptions based on the established base.
- **Enterprise-Grade PDF Emissions**: One-click generation of beautifully formatted PDF dossiers (`Dossiê POP`) embedding metadata, production numbers, calculated parameters, and structural telemetry.
- **Rigorous UI/UX**: Commercial SaaS aesthetics powered by Tailwind CSS. Engineered with legibility, precision data rendering, zero-overflow policies, and a sterile laboratory interface in mind.
- **Traceability Management**: Captures operator identification, system-generated batch lots, and timestamps right out of the box.

## 🛠 Technology Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **PDF Generation**: [@react-pdf/renderer](https://react-pdf.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

## ⚙️ Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/BIbEsfiha1/Dilutio.git
   cd Dilutio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🧪 Architecture

- `src/hooks/useCannabisCalculations.ts`: Core mathematical engine handling all matrix and fractioning derivations with sterile validation logic.
- `src/components/NativePdfDocument.tsx`: Declarative PDF layout mirroring the precision of physical laboratory reports.
- `src/components/ClinicalFractioning.tsx`: Interactive prescription mapping with built-in safety alerts for stock thresholds.

## 🛡️ Maintainer

Designed for the pursuit of rigorous extraction standards by **[Herbarium Genetics](https://www.herbarium.ong.br/)**.
