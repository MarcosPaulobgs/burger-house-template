// Logotipo oficial da marca (fornecido pelo cliente).
export default function Logo({ size = 48, className = "" }) {
  return (
    <img
      src="/assets/img/logo.png"
      alt="Logotipo Burger House"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover" }}
    />
  );
}