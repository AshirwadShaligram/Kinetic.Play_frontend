"use client";

import RegisterForm from "@/components/auth/forms/RegisterForm";
import { useAppSelector } from "@/redux/hooks/authHooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Bolt,
  Lock2Newicons,
  Shield2,
  ShieldLock,
  Sledgehammer,
  Station2,
} from "reicon-react";

const RegisterPage = () => {
  const { isLoggedIn, authChecked } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (authChecked && isLoggedIn) {
      router.replace("/");
    }
  }, [authChecked, isLoggedIn, router]);

  if (!authChecked || isLoggedIn) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Register Header */}
      <div className="flex flex-col p-3 shrink-0">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full bg-amber-500 border-2" />

          <h1>KINETIC CORE NODE IDENTITY ARCHITECTURE</h1>
        </div>

        <h1 className="text-2xl font-bold">
          Access Protocol & Guild Enlistment
        </h1>
      </div>

      {/* Form */}
      <div className="flex flex-1">
        {/* Left */}
        <div className="hidden md:flex md:flex-1 bg-gray-200 flex-col p-3">
          <div className="flex-1">
            <div>
              <h1 className="text-gray-600 font-semibold text-[10px]">
                ECOSYSTEM ACCESS: PHASE IV
              </h1>
            </div>
            <div className="bg-blue-100 h-full">
              <Image
                src="/1.png"
                alt="pc"
                priority
                className="object-cover"
                width={1000}
                height={10}
              />
            </div>
          </div>
          <div className="flex flex-1/12 flex-col">
            <div className="flex-1 flex flex-col gap-1">
              <div className="bg-gray-300 flex gap-2  p-3">
                <div className="flex">
                  <Bolt
                    className="bg-foreground text-background p-1"
                    size={32}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="flex gap-2 font-semibold">
                    Priority Drop Quotas{" "}
                    <span className="bg-accent rounded-sm w-20 flex items-center justify-center">
                      RTX 5090
                    </span>
                  </h1>
                  <p className="text-[11px]">
                    Guaranteed tier allocation on RTX 50/4090 series, limited
                    foundry consoles, and artisan custom mechanical boards.
                  </p>
                </div>
              </div>
              <div className="bg-gray-300 flex gap-2  p-3">
                <div className="flex">
                  <Station2
                    className="bg-foreground text-background p-1"
                    size={32}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="flex gap-2 font-semibold">
                    Verified Builder Workstations
                  </h1>
                  <p className="text-[11px]">
                    Direct access to custom liquid cooling loops with 48-hour
                    continuous live telemetry bench burn-ins.
                  </p>
                </div>
              </div>
              <div className="bg-gray-300 flex gap-2  p-3">
                <div className="flex">
                  <Shield2
                    className="bg-foreground text-background p-1"
                    size={32}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="flex gap-2 font-semibold">
                    Escrow & Anti-Scalp Guarantee
                  </h1>
                  <p className="text-[11px]">
                    Zero scalper queues backed by Bot Sentinel AI and
                    instantaneous ₹500 store reserve credited on authorization.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <h1 className="flex items-center gap-2 text-[10px]">
                <Lock2Newicons size={12} />
                Hardware Token Auth Protected
              </h1>
              <p className="text-[10px] flex items-center">
                KINETIC STANDARD <span className="font-extrabold">.</span>
                V.4.2
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1">
          <RegisterForm />
        </div>
      </div>

      {/* Footer */}
      <div className="flex md:flex-row items-center gap-2 justify-around">
        <div className="flex items-center gap-2">
          <ShieldLock size={12} />
          <h1 className="text-[6px] md:text-[8px]">
            TLS 1.3 End-to-End Encrypted
          </h1>
        </div>

        <span className="w-2 h-2 rounded-full bg-gray-500 border-2" />

        <div className="flex items-center gap-2">
          <Sledgehammer size={12} />
          <h1 className="text-[6px] md:text-[8px]">Kinetic Privacy Charter</h1>
        </div>

        <span className="w-2 h-2 rounded-full bg-gray-500 border-2" />

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 border-2" />
          <h1 className="text-[6px] md:text-[8px]">
            Ecosystem Integrity: 100% Operational
          </h1>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
