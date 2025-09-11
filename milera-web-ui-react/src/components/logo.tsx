export default function Logo({ width = 40, height = 40, className = "" }) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <img
                src="/src/assets/milera-logo.png"
                alt="Milera Logo"
                width={width}
                height={height}
                style={{
                    maxWidth: "100%",
                    height: "auto",
                }}
                loading="lazy"
            />
        </div>
    );
}
