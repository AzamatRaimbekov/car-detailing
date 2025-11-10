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
              className="text-graphite-600 hover:text-liquid-gloss-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-liquid-gloss-500 to-liquid-gloss-600 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-graphite-900">
                  Политика конфиденциальности
                </h1>
                <p className="text-graphite-600">Prime Detail</p>
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
                <div className="w-12 h-12 bg-liquid-gloss-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-liquid-gloss-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-graphite-900 mb-2">
                    Общие положения
                  </h2>
                  <p className="text-graphite-600 leading-relaxed">
                    Настоящая Политика конфиденциальности определяет порядок обработки и защиты 
                    персональных данных пользователей сайта Prime Detail. Мы серьезно относимся 
                    к защите вашей конфиденциальности и обеспечиваем безопасность ваших данных.
                  </p>
                </div>
              </div>
              <p className="text-sm text-graphite-500">
                Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
              </p>
            </CardContent>
          </Card>

          {/* Data Collection */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-liquid-gloss-100 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-liquid-gloss-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-graphite-900 mb-4">
                    Какие данные мы собираем
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-graphite-800 mb-2">
                        Персональные данные:
                      </h3>
                      <ul className="list-disc list-inside text-graphite-600 space-y-1 ml-4">
                        <li>Имя и фамилия</li>
                        <li>Номер телефона</li>
                        <li>Адрес электронной почты (при указании)</li>
                        <li>Информация об автомобиле (марка, модель)</li>
                        <li>Предпочтения по услугам</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-graphite-800 mb-2">
                        Техническая информация:
                      </h3>
                      <ul className="list-disc list-inside text-graphite-600 space-y-1 ml-4">
                        <li>IP-адрес</li>
                        <li>Тип браузера и устройства</li>
                        <li>Данные о посещении сайта</li>
                        <li>Файлы cookie</li>
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
                <div className="w-12 h-12 bg-liquid-gloss-100 rounded-xl flex items-center justify-center">
                  <Lock className="w-6 h-6 text-liquid-gloss-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-graphite-900 mb-4">
                    Как мы используем ваши данные
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-liquid-gloss-500 rounded-full mt-2"></div>
                      <p className="text-graphite-600">
                        <strong>Обработка заявок:</strong> Связь с вами для уточнения деталей услуг и записи на прием
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-liquid-gloss-500 rounded-full mt-2"></div>
                      <p className="text-graphite-600">
                        <strong>Предоставление услуг:</strong> Выполнение заказанных услуг детейлинга
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-liquid-gloss-500 rounded-full mt-2"></div>
                      <p className="text-graphite-600">
                        <strong>Информирование:</strong> Уведомления о готовности автомобиля, акциях и новых услугах
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-liquid-gloss-500 rounded-full mt-2"></div>
                      <p className="text-graphite-600">
                        <strong>Улучшение сервиса:</strong> Анализ качества услуг и повышение уровня обслуживания
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
                Защита персональных данных
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-semibold text-graphite-800">Технические меры:</h3>
                  <ul className="text-graphite-600 space-y-1">
                    <li>• SSL-шифрование данных</li>
                    <li>• Защищенные серверы</li>
                    <li>• Регулярные обновления безопасности</li>
                    <li>• Ограниченный доступ к данным</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-graphite-800">Организационные меры:</h3>
                  <ul className="text-graphite-600 space-y-1">
                    <li>• Обучение персонала</li>
                    <li>• Контроль доступа</li>
                    <li>• Политики безопасности</li>
                    <li>• Регулярный аудит</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rights */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold text-graphite-900 mb-4">
                Ваши права
              </h2>
              <div className="space-y-4">
                <p className="text-graphite-600">
                  В соответствии с законодательством о защите персональных данных, вы имеете право:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-liquid-gloss-500 rounded-full"></div>
                      <span className="text-graphite-700 font-medium">Доступ к данным</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-liquid-gloss-500 rounded-full"></div>
                      <span className="text-graphite-700 font-medium">Исправление данных</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-liquid-gloss-500 rounded-full"></div>
                      <span className="text-graphite-700 font-medium">Удаление данных</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-liquid-gloss-500 rounded-full"></div>
                      <span className="text-graphite-700 font-medium">Ограничение обработки</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-liquid-gloss-500 rounded-full"></div>
                      <span className="text-graphite-700 font-medium">Отзыв согласия</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-liquid-gloss-500 rounded-full"></div>
                      <span className="text-graphite-700 font-medium">Портируемость данных</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-liquid-gloss-50 to-liquid-gloss-100">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-bold text-graphite-900 mb-4">
                Вопросы по конфиденциальности?
              </h2>
              <p className="text-graphite-600 mb-6">
                Если у вас есть вопросы о нашей политике конфиденциальности или вы хотите 
                воспользоваться своими правами, свяжитесь с нами:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="liquid"
                  onClick={() => window.location.href = 'tel:+996555123456'}
                >
                  Позвонить: +996 555 123 456
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.location.href = 'mailto:privacy@primedetail.kg'}
                >
                  Написать: privacy@primedetail.kg
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
