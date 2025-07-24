import { motion } from 'framer-motion';
import { Calculator, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import React from 'react';

interface CostCalculatorProps {
  manualHours: number;
  setManualHours: (hours: number) => void;
  hourlyRate: number;
  setHourlyRate: (rate: number) => void;
  employeeCount: number;
  setEmployeeCount: (count: number) => void;
  roiData: {
    monthlySavings: number;
    yearlySavings: number;
    roi: number;
    breakEven: number;
  };
}

const CostCalculator: React.FC<CostCalculatorProps> = ({
  manualHours,
  setManualHours,
  hourlyRate,
  setHourlyRate,
  employeeCount,
  setEmployeeCount,
  roiData,
}) => {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Calculate Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ROI</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Use our simple tool to estimate the time and money you could save by automating your manual processes.
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Calculator Inputs */}
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-6">Your Current Situation</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Hours spent on manual tasks per week
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="40"
                      value={manualHours}
                      onChange={(e) => setManualHours(parseInt(e.target.value))}
                      className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>1hr</span>
                      <span className="font-semibold text-primary">{manualHours} hours</span>
                      <span>40hrs</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Average hourly rate ($)
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="25"
                      max="200"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(parseInt(e.target.value))}
                      className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>$25</span>
                      <span className="font-semibold text-primary">${hourlyRate}/hr</span>
                      <span>$200</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Number of employees affected
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={employeeCount}
                      onChange={(e) => setEmployeeCount(parseInt(e.target.value))}
                      className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>1</span>
                      <span className="font-semibold text-primary">{employeeCount} people</span>
                      <span>50+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROI Results */}
          <div className="space-y-6">
            <motion.div
              className="p-8 rounded-3xl bg-gradient-to-r from-accent/10 to-secondary/10 border border-accent/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Calculator className="w-6 h-6 text-primary" />
                Your Potential Savings
              </h3>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    ${roiData.monthlySavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Monthly Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">
                    ${roiData.yearlySavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Yearly Savings</div>
                </div>
              </div>

              <div className="bg-card/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-foreground font-medium">ROI after 1 year:</span>
                  <span className="text-2xl font-bold text-primary">{roiData.roi.toFixed(0)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Break-even point:</span>
                  <span className="text-lg font-semibold text-accent">
                    {roiData.breakEven} month{roiData.breakEven !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </motion.div>

            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-secondary rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
                <Button className="relative w-full py-4 text-lg font-semibold bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-white border-0 rounded-2xl shadow-2xl flex items-center justify-center gap-3">
                  Start Saving Money
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CostCalculator;
