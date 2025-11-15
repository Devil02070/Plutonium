import React, { ReactNode, CSSProperties } from "react";

interface BorderEdgesProps {
    children: ReactNode;
    cornerSize?: number;
    cornerThickness?: number;
    cornerColor?: string;
    className?: string;
    padding?: number;
}

const BorderEdges: React.FC<BorderEdgesProps> = ({
    children,
    cornerSize = 8,
    cornerThickness = 1,
    cornerColor = "#ffffff",
    className = "",
    padding = 0,
}) => {
    const cornerStyle = (width: number, height: number): CSSProperties => ({
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: cornerColor,
    });

    return (
        <div
            className={`relative inline-block  ${className} `}
            style={{ padding: `${padding}px` }}
        >
            {children}

            {/* Top Left Corner */}
            <div className="absolute top-0 left-0" style={cornerStyle(cornerSize, cornerThickness)} />
            <div className="absolute top-0 left-0" style={cornerStyle(cornerThickness, cornerSize)} />

            {/* Top Right Corner */}
            <div className="absolute top-0 right-0" style={cornerStyle(cornerSize, cornerThickness)} />
            <div className="absolute top-0 right-0" style={cornerStyle(cornerThickness, cornerSize)} />

            {/* Bottom Left Corner */}
            <div className="absolute bottom-0 left-0" style={cornerStyle(cornerSize, cornerThickness)} />
            <div className="absolute bottom-0 left-0" style={cornerStyle(cornerThickness, cornerSize)} />

            {/* Bottom Right Corner */}
            <div className="absolute bottom-0 right-0" style={cornerStyle(cornerSize, cornerThickness)} />
            <div className="absolute bottom-0 right-0" style={cornerStyle(cornerThickness, cornerSize)} />
        </div>
    );
};

export default BorderEdges;
