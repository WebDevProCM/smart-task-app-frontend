import { GradientSwitchBtn } from "@/components/gradient-switch-btn";
import LayoutHeaderText from "@/components/layout-header-text";
import { Button } from "@/components/ui/button";
import {Plus} from "lucide-react";
import { ChartAreaInteractive } from "@/components/dashboard/chart-area";
import { SectionCards } from "@/components/dashboard/section-cards";


export default function Page() {
  return (
    <main className="flex flex-col mt-3">
      <LayoutHeaderText />

      <section className="w-full bg-white mt-3 h-full py-5 px-3 rounded-sm shadow-lg">
         <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
