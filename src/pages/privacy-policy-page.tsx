import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from 'lucide-react'
import { Button, Card, CardContent } from '../shared/ui'

export function PrivacyPolicyPage() {
  const handleBackClick = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-graphite-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-graphite-200">
        <div className="container mx-auto container-padding py-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackClick}
              className="text-graphite-600 hover:text-gold-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-graphite-900">
                  Privacy Policy
                </h1>
                <p className="text-graphite-600">SHINE PORT</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto container-padding py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Introduction */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-graphite-900 mb-2">
                    General Provisions
                  </h2>
                  <p className="text-graphite-600 leading-relaxed">
                    This Privacy Policy defines the procedure for processing and protecting 
                    personal data of SHINE PORT website users. We take the protection of your 
                    privacy seriously and ensure the security of your data.
                  </p>
                </div>
              </div>
              <p className="text-sm text-graphite-500">
                Last updated: {new Date().toLocaleDateString('en-US')}
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-gold-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-graphite-900 mb-4">
                    What Data We Collect
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-graphite-800 mb-2">
                        Personal Data:
                      </h3>
                      <ul className="list-disc list-inside text-graphite-600 space-y-1 ml-4">
                        <li>First and last name</li>
                        <li>Phone number</li>
                        <li>Email address (if provided)</li>
                        <li>Car information (make, model)</li>
                        <li>Service preferences</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-graphite-800 mb-2">
                        Technical Information:
                      </h3>
                      <ul className="list-disc list-inside text-graphite-600 space-y-1 ml-4">
                        <li>IP address</li>
                        <li>Browser and device type</li>
                        <li>Website visit data</li>
                        <li>Cookies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Usage */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-gold-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-graphite-900 mb-4">
                    How We Use Your Data
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gold-500 rounded-full mt-2"></div>
                      <p className="text-graphite-600">
                        <strong>Processing Requests:</strong> Contacting you to clarify service details and schedule appointments
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gold-500 rounded-full mt-2"></div>
                      <p className="text-graphite-600">
                        <strong>Service Provision:</strong> Performing ordered detailing services
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gold-500 rounded-full mt-2"></div>
                      <p className="text-graphite-600">
                        <strong>Notifications:</strong> Notifications about car readiness, promotions and new services
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gold-500 rounded-full mt-2"></div>
                      <p className="text-graphite-600">
                        <strong>Service Improvement:</strong> Analysis of service quality and improvement of service level
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-graphite-900 mb-4">
                Personal Data Protection
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-graphite-800">Technical Measures:</h3>
                  <ul className="text-graphite-600 space-y-1">
                    <li>• SSL data encryption</li>
                    <li>• Secure servers</li>
                    <li>• Regular security updates</li>
                    <li>• Limited data access</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-graphite-800">Organizational Measures:</h3>
                  <ul className="text-graphite-600 space-y-1">
                    <li>• Staff training</li>
                    <li>• Access control</li>
                    <li>• Security policies</li>
                    <li>• Regular audits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rights */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-graphite-900 mb-4">
                Your Rights
              </h2>
              <div className="space-y-4">
                <p className="text-graphite-600">
                  In accordance with personal data protection legislation, you have the right to:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                      <span className="text-graphite-700 font-medium">Access to data</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                      <span className="text-graphite-700 font-medium">Data correction</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                      <span className="text-graphite-700 font-medium">Data deletion</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                      <span className="text-graphite-700 font-medium">Processing restriction</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                      <span className="text-graphite-700 font-medium">Consent withdrawal</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gold-500 rounded-full"></div>
                      <span className="text-graphite-700 font-medium">Data portability</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-gold-50 to-gold-100">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-bold text-graphite-900 mb-4">
                Privacy Questions?
              </h2>
              <p className="text-graphite-600 mb-6">
                If you have questions about our privacy policy or want to 
                exercise your rights, contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="liquid"
                  onClick={() => window.location.href = 'tel:+15551234567'}
                >
                  Call: +1 (555) 123-4567
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = 'mailto:privacy@shineport.us'}
                >
                  Email: privacy@shineport.us
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
