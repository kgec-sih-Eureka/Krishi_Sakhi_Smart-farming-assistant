import { Leaf } from "lucide-react";

export function Logo() {
  return (
    <>
      <div className="flex items-center">
        <div className="flex-shrink-0 flex items-center">
          {/* Logo Icon */}
          <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
            <Leaf className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </>
  );
}
