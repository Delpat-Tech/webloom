import { motion } from 'framer-motion';
import { ArrowRight, Minus, Plus, DollarSign, TrendingUp, Users, Clock } from 'react-feather';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import React from 'react';
import { CostCalculatorProps } from '@/types';
import ElasticSlider from '@/components/ui/ElasticSlider';

const CostCalculator: React.FC<CostCalculatorProps> = ({
  manualHours,
  setManualHours,
  hourlyRate,
  setHourlyRate,
  employeeCount,
  setEmployeeCount,
  currency,
  setCurrency,
  roiData,
}) => {
  // Currency configuration
  const currencyConfig = {
    USD: {
      symbol: '$',
      name: 'US Dollar',
      hourlyRateRange: { min: 25, max: 200 },
      format: (amount: number) => `$${amount.toLocaleString()}`
    },
    INR: {
      symbol: '₹',
      name: 'Indian Rupee',
      hourlyRateRange: { min: 1000, max: 15000 },
      format: (amount: number) => `₹${amount.toLocaleString('en-IN')}`
    }
  };

  const currentConfig = currencyConfig[currency];

  return (
    <section className="relative px-4 sm:px-6 md:px-12 lg:px-20 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Calculate Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ROI</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            Use our interactive calculator to estimate the time and money you could save by automating your manual processes.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Calculator Inputs */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div 
              className="p-5 sm:p-6 lg:p-7 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 shadow-xl"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-primary/10">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Your Current Situation</h3>
              </div>
              
              {/* Currency Selector */}
              <div className="mb-5 sm:mb-6">
                <label className="block text-sm font-semibold text-foreground mb-3 sm:mb-4">
                  Select Currency
                </label>
                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={() => setCurrency('INR')}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
                      currency === 'INR'
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
                        : 'bg-card/50 border-border text-foreground hover:border-primary/50 hover:bg-card/80'
                    }`}
                  >
                    <span className="text-base sm:text-lg">₹</span>
                    <span className="font-medium">INR</span>
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 transition-all duration-300 text-sm sm:text-base ${
                      currency === 'USD'
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
                        : 'bg-card/50 border-border text-foreground hover:border-primary/50 hover:bg-card/80'
                    }`}
                  >
                    <span className="text-base sm:text-lg">$</span>
                    <span className="font-medium">USD</span>
                  </button>
                </div>
              </div>

              <div className="space-y-5 sm:space-y-6">
                {/* Hours Slider */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-accent/10">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    </div>
                    <label className="text-base sm:text-lg font-semibold text-foreground">
                      Hours spent on manual tasks per week
                    </label>
                  </div>
                  <div className="px-2 sm:px-4">
                    <ElasticSlider
                      defaultValue={manualHours}
                      startingValue={1}
                      maxValue={40}
                      isStepped={true}
                      stepSize={1}
                      leftIcon={<Minus className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />}
                      rightIcon={<Plus className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />}
                      onValueChange={setManualHours}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-muted-foreground px-2 sm:px-4">
                    <span>1hr</span>
                    <span className="font-semibold text-primary text-sm sm:text-base">{manualHours} hours</span>
                    <span>40hrs</span>
                  </div>
                </div>

                {/* Hourly Rate Slider */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-secondary/10">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                    </div>
                    <label className="text-base sm:text-lg font-semibold text-foreground">
                      Average hourly rate ({currentConfig.symbol})
                    </label>
                  </div>
                  <div className="px-2 sm:px-4">
                    <ElasticSlider
                      defaultValue={hourlyRate}
                      startingValue={currentConfig.hourlyRateRange.min}
                      maxValue={currentConfig.hourlyRateRange.max}
                      isStepped={true}
                      stepSize={currency === 'USD' ? 5 : 100}
                      leftIcon={<Minus className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />}
                      rightIcon={<Plus className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />}
                      onValueChange={setHourlyRate}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-muted-foreground px-2 sm:px-4">
                    <span>{currentConfig.format(currentConfig.hourlyRateRange.min)}</span>
                    <span className="font-semibold text-primary text-sm sm:text-base">{currentConfig.format(hourlyRate)}/hr</span>
                    <span>{currentConfig.format(currentConfig.hourlyRateRange.max)}</span>
                  </div>
                </div>

                {/* Employee Count Slider */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <label className="text-base sm:text-lg font-semibold text-foreground">
                      Number of employees affected
                    </label>
                  </div>
                  <div className="px-2 sm:px-4">
                    <ElasticSlider
                      defaultValue={employeeCount}
                      startingValue={1}
                      maxValue={50}
                      isStepped={true}
                      stepSize={1}
                      leftIcon={<Minus className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />}
                      rightIcon={<Plus className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />}
                      onValueChange={setEmployeeCount}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm text-muted-foreground px-2 sm:px-4">
                    <span>1</span>
                    <span className="font-semibold text-primary text-sm sm:text-base">{employeeCount} people</span>
                    <span>50+</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ROI Results */}
          <div className="flex flex-col h-full">
            <motion.div
              className="p-5 sm:p-6 lg:p-7 rounded-3xl bg-gradient-to-br from-accent/10 via-secondary/10 to-primary/10 border border-accent/20 shadow-xl flex-1 flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-6">
                <div className="p-2 sm:p-3 rounded-xl bg-accent/20">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">Your Potential Savings</h3>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col justify-between">
                {/* Top Section - Savings Cards */}
                <div className="space-y-4 sm:space-y-5">
                  {/* Savings Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <motion.div 
                      className="text-center p-3 sm:p-4 lg:p-5 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-accent mb-1 sm:mb-2">
                        {currentConfig.format(roiData.monthlySavings)}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground font-medium">Monthly Savings</div>
                    </motion.div>
                    <motion.div 
                      className="text-center p-3 sm:p-4 lg:p-5 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 border border-secondary/30"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <div className="text-lg sm:text-xl lg:text-2xl font-bold text-secondary mb-1 sm:mb-2">
                        {currentConfig.format(roiData.yearlySavings)}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground font-medium">Yearly Savings</div>
                    </motion.div>
                  </div>

                  {/* ROI Metrics */}
                  <motion.div 
                    className="bg-gradient-to-r from-card/20 to-card/10 rounded-2xl p-3 sm:p-4 lg:p-5 border border-border/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground font-semibold text-sm sm:text-base">ROI after 1 year:</span>
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">{roiData.roi.toFixed(0)}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground font-semibold text-sm sm:text-base">Break-even point:</span>
                        <span className="text-sm sm:text-base lg:text-lg font-semibold text-accent">
                          {roiData.breakEven} month{roiData.breakEven !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Section - Additional Info */}
                <div className="mt-4 sm:mt-5 lg:mt-6 space-y-3 sm:space-y-4">
                  <motion.div 
                    className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-3 sm:p-4 lg:p-5 border border-primary/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-primary/20">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm sm:text-base">What this means for you:</h4>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary"></div>
                        <span>Automation pays for itself in just {roiData.breakEven} month{roiData.breakEven !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-accent"></div>
                        <span>Free up {manualHours * employeeCount} hours per week for strategic work</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-secondary"></div>
                        <span>Scale operations without proportional cost increase</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group mt-3 sm:mt-4 lg:mt-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-secondary rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <Button
                href="/contact"
                className="relative w-full py-2.5 sm:py-3 lg:py-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-white border-0 rounded-2xl shadow-2xl flex items-center justify-center gap-3 transition-all duration-300"
              >
                Start Saving Money
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CostCalculator;
