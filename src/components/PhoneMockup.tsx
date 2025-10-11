import React from "react";

export default function PhoneMockup({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-500">
      <div className="mockup-phone border-blue-500 scale-90">
        <div className="camera"></div>
        <div className="display bg-base-100 rounded-3xl shadow-xl overflow-hidden">
          <div className="artboard phone-1 p-0 min-h-[600px] w-[300px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
