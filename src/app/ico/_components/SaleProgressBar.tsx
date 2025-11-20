export default function SaleProgressBar({ progress = 60 }) {
    return (
        <div
            className="w-full max-w-2xl"
            style={{
                clipPath: "polygon(4% 0px, 100% 0px, 96% 100%, 0% 100%)"
            }}
        >
            <div className="relative h-6 w-full bg-[#D9D9D9] overflow-hidden">
                {/* Filled purple striped area */}
                <div
                    className="h-full bg-[#6956EF] relative overflow-hidden"
                    style={{
                        width: `${progress}%`,
                        clipPath: "polygon(4% 0px, 100% 0px, 96% 100%, 0% 100%)"
                    }}
                >
                    {/* diagonal stripes */}
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.25)_0px,rgba(255,255,255,1)_1px,transparent_1px,transparent_10px)]" />
                </div>
                {/* remaining grey area */}
                <div className="absolute top-0 right-0 h-full bg-[#D9D9D9]" style={{ width: `${100 - progress}%` }}></div>
            </div>
        </div>
    );
}
