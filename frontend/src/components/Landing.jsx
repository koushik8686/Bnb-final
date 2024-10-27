import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas, useFrame} from '@react-three/fiber'
import { useInView } from 'react-intersection-observer'
import { OrbitControls, Sphere } from '@react-three/drei'
import { Link } from 'react-router-dom'  // Changed from next/link to react-router-dom

// Particle component
const Particle = ({ position }) => {
  return (
    <Sphere args={[0.1, 16, 16]} position={position}>
      <meshBasicMaterial color="#FF0080" />
    </Sphere>
  )
}
// Background Particles
const BackgroundParticles = () => {
  const particlesRef = useRef([])

  useEffect(() => {
    particlesRef.current = Array(100).fill().map(() => ({
      position: [
        Math.random() * 40 - 20,
        Math.random() * 40 - 20,
        Math.random() * 40 - 20
      ],
      velocity: [
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ]
    }))
  }, [])

  useFrame(() => {
    particlesRef.current.forEach(particle => {
      particle.position[0] += particle.velocity[0]
      particle.position[1] += particle.velocity[1]
      particle.position[2] += particle.velocity[2]

// sourcery skip: use-braces
      if (Math.abs(particle.position[0]) > 20) particle.velocity[0] *= -1
      if (Math.abs(particle.position[1]) > 20) particle.velocity[1] *= -1
      if (Math.abs(particle.position[2]) > 20) particle.velocity[2] *= -1
    })
  })

  return (
    <>
      {particlesRef.current.map((particle, index) => (
        <Particle key={index} position={particle.position} />
      ))}
    </>
  )
}
// Navbar Component
const Navbar = ({ userRole }) => {
  return (
    <nav className="bg-[#45235F] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Our Website
        </Link>
        <div className="space-x-4">
          <Link to="/user/login" className="text-white hover:text-gray-300">
            Users
          </Link>
          <Link to="/teamleads/login" className="text-white hover:text-gray-300">
            Team Leaders
          </Link>
          <Link to="/judges/login" className="text-white hover:text-gray-300">
            Judges
          </Link>
          <Link to="/admin/login" className="text-white hover:text-gray-300">
            Admins
          </Link>
        </div>
      </div>
    </nav>
  )
}

// Advanced 3D Model or Geometry
const AdvancedGeometry = ({ position }) => {
  const meshRef = useRef()

  useFrame((state) => {
    const { clock } = state
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.1
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.3
  })

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[3, 2]} />
      <meshStandardMaterial color="#FF0080" wireframe />
    </mesh>
  )
}

const Scene = () => {
  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AdvancedGeometry position={[0, 0, 0]} />
    </>
  )
}

const Section = ({ children, background }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`min-h-screen flex items-center justify-center ${background}`}
    >
      {children}
    </motion.section>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-[#45235F] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2 text-[#FF0080]">GamerStop</h3>
            <p>Find a Way in Registering in Tournaments!!</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2 text-[#FF0080]">Quick Links</h3>
            <ul>
              <li>
                <Link to="/user/login" className="hover:text-[#FF0080]">User</Link>
              </li>
              <li>
                <Link to="/teamleads/login" className="hover:text-[#FF0080]">Team Leaders</Link>
              </li>
              <li>
                <Link to="/judges/login" className="hover:text-[#FF0080]">Judges</Link>
              </li>
              <li>
                <Link to="/judges/admin" className="hover:text-[#FF0080]">Admins</Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2 hover:text-[#FF0080]">Connect</h3>
            <ul>
              <li><a href="#" className="hover:text-[#FF0080]">Facebook</a></li>
              <li><a href="#" className="hover:text-[#FF0080]">Twitter</a></li>
              <li><a href="#" className="hover:text-[#FF0080]">LinkedIn</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-bold mb-2 hover:text-[#FF0080]">UpComing Games</h3>
            <p className="mb-2">Stay updated with our latest tablecharts for upcoming games</p>
            <input type="email" placeholder="Enter your email" className="w-full p-2 text-gray-900 rounded" />
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Our Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function Start() {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5])
  const [userRole, setUserRole] = useState('user')

  return (
    <div className="bg-[#1A0933] text-white">
      <Navbar userRole={userRole} />
      
      {/* First Section: 3D Model + Intro Text */}
      <Section background="bg-[#1A0933]">
        <div className="h-screen w-full flex flex-col lg:flex-row justify-between items-center px-8">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 w-full text-center lg:text-left"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 hover:text-[#FF0080]">
              Welcome to Our Website
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-lg lg:text-xl mb-8"
            >
              Experience the future of digital interaction with cutting-edge technologies and designs that captivate.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-[#FF0080] hover:bg-[#FF1493] text-white font-bold py-3 px-6 rounded-full transition duration-300 inline-block"
            >
              <Link to="#">Read more</Link>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <div className="h-[50vh] lg:h-full w-full lg:w-1/2 mt-8 lg:mt-0">
            <Canvas>
              <Scene />
            </Canvas>
          </div>
        </div>
      </Section>

      {/* Second Section: User */}
      <Section background="bg-[#2D1657]">
        <motion.div style={{ scale }} className="max-w-4xl mx-auto p-8">
          <h2 className="text-4xl font-bold mb-4 hover:bg-[#FF0080]">Users</h2>
          <p className="text-xl mb-6">
            As a User, you are a participant in our tournaments! Explore the exciting range of events available and register using a unique code provided by your team leader. 
            Enjoy a hassle-free experience as you join fellow employees in friendly competition. 
            Your scores will be tracked, and you will receive a participation certificate at the end of each event, celebrating your involvement!
          </p>
          <Link to="/about" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Learn More
          </Link>
        </motion.div>
      </Section>

      {/* Third Section: Features */}
      <Section background="bg-[#45235F]">
        <div className="max-w-4xl mx-auto p-8">
          <h2 className="text-4xl font-bold mb-8 text-[#FF0080]">Team Leaders Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#2D1657] p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2 text-[#FF0080]">Leaderboard Display</h3>
              <p>
                Showcase a dynamic leaderboard that highlights the top-performing teams and their leaders. 
                This real-time feature allows Team Leaders to see where their team stands in comparison to others, fostering healthy competition and motivating them to strive for higher rankings.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#2D1657] p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2 text-[#FF0080]">Achievement Badges</h3>
              <p>
                Implement a badge system that rewards Team Leaders for various accomplishments, such as registering their team, achieving a specific score, or completing events. 
                These badges can be displayed on their profiles, showcasing their leadership skills and encouraging them to participate in more events.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-[#2D1657] p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2 text-[#FF0080]">Profile Spotlight</h3>
              <p>
                Create a dedicated section on the homepage or dashboard that spotlights outstanding Team Leaders and their teams. 
                This feature can include profiles highlighting their achievements, team photos, and testimonials, giving recognition and inspiring others to excel.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="bg-[#2D1657] p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2 text-[#FF0080]">Certificate of Excellence</h3>
              <p>
                Provide Team Leaders with a digital Certificate of Excellence upon completion of tournaments or upon achieving specific milestones. 
                These certificates can be personalized and shared on their social media profiles, serving as a testament to their leadership and commitment to team success.
              </p>
            </motion.div>
          </div>
          <div className="text-center">
            <Link to="/teamleads/login" className="bg-[#FF0080] hover:bg-[#FF1493] text-white font-bold py-2 px-4 rounded">
              Explore from Website
            </Link>
          </div>
        </div>
      </Section>

      {/* Final Section: Judges*/}
      <Section background="bg-[#1A0933]">
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          }}
          className="max-w-4xl mx-auto p-8 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-[#FF0080]">Judges</h2>
          <p className="text-xl mb-8">Greetings, Judge! Your expertise and fairness are essential to maintaining the integrity of our tournaments. Use the judging panel to score participants and teams based on their performance. The system will automatically calculate total points, making your job easier. 
            After each event, you'll contribute to generating dynamic participation certificates, recognizing the efforts and achievements of every participant.</p>
          <Link
            to="/judges/login"
            className="bg-[#FF0080] hover:bg-[#FF1493] text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Reach Out
          </Link>
        </motion.div>
      </Section>

      <Footer />
    </div>
  )
}

export default Start