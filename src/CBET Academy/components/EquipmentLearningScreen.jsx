import React from "react";
import EquipmentLearningCenter from "../EquipmentLearningCenter";

export default function EquipmentLearningScreen({ onExit, onCertificates }) {
  return <EquipmentLearningCenter onExit={onExit} onCertificates={onCertificates} />;
}
