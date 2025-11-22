import { motion } from 'framer-motion'
import { ShieldCheck, Award, Star, Users, Home, Camera } from 'lucide-react'
import { Card, CardContent } from '../shared/ui'

const features = [
  {
    icon: ShieldCheck,
    title: '9H Ceramic',
    description: 'Long-lasting protection up to 3 years with official warranty',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Award,
    title: '24 Month Warranty',
    description: 'Official warranty on all types of work and materials',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Star,
    title: 'Professional Materials',
    description: 'Gyeon, CarPro, 3M, Suntek - only trusted brands',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Users,
    title: '5+ Years Experience',
    description: 'Over 1000 satisfied clients and impeccable reputation',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Home,
    title: 'Clean Work Zone',
    description: 'Enclosed bay with dust control and optimal conditions',
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Camera,
    title: 'Before/After Photos',
    description: 'We document every step of the work for your peace of mind',
    gradient: 'from-teal-500 to-cyan-500'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

export function FeaturesSection() {
  return (
    <section 
      className="section-padding bg-gradient-to-br from-graphite-50 to-white"
      aria-label="Features - Why choose SHINE PORT"
    >
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-graphite-900 mb-4">
            Why Choose
            <span className="text-gradient ml-3">SHINE PORT</span>
          </h2>
          <p className="text-xl text-graphite-600 max-w-3xl mx-auto">
            We use only proven technologies and premium materials 
            to give your car maximum protection and impeccable appearance
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <div className="absolute inset-0 w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-graphite-900 mb-3 group-hover:text-gold-600 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-graphite-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-graphite-500 mb-8 text-lg">Certified Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Gyeon', 'CarPro', '3M', 'Suntek'].map((brand) => (
              <div
                key={brand}
                className="text-2xl font-bold text-graphite-400 hover:text-gold-500 transition-colors cursor-pointer"
              >
                {brand}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
