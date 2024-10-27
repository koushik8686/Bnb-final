// 'use client'

// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import Cookies from 'js-cookie'
// import { motion, AnimatePresence } from 'framer-motion'
// import { User, Gamepad, Award, MessageCircle } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Skeleton } from "@/components/ui/skeleton"
// import { ScrollArea } from "@/components/ui/scroll-area"

// type UserDetails = {
//   uniquecode: string
//   email: string
//   age: number
//   points: { game: string; points: number }[]
// }

// type Judge = {
//   name: string
// }

// type Player = {
//   id: string
//   uniquecode: string
// }

// type Team = {
//   teamNickname: string
//   corporatecode: string
//   points: number
//   players: Player[]
// }

// type Game = {
//   eventname: string
//   Location: string
//   number_of_players: number
//   start_time: string
//   end_time: string
//   status: string
//   singleplayer: boolean
//   multiplayer: boolean
//   judges: Judge[]
//   teams: Team[]
// }

// export default function EnhancedUserDashboard() {
//   const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
//   const [games, setGames] = useState<Game[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [activeTab, setActiveTab] = useState<'profile' | 'games' | 'certificates' | 'chat'>('profile')

//   const fetchUserDetails = async () => {
//     const userId = Cookies.get('user')
//     if (!userId) {
//       setError('User ID not found')
//       return
//     }
//     try {
//       const response = await axios.get(`http://localhost:4000/user/getuserdetails/${userId}`)
//       setUserDetails(response.data)
//     } catch (err) {
//       console.error('Error fetching user details:', err)
//       setError('Failed to fetch user details')
//     }
//   }

//   const fetchUserGames = async () => {
//     const userId = Cookies.get('authToken')
//     if (!userId) {
//       setError('User ID not found')
//       return
//     }

//     try {
//       const response = await axios.get(http://localhost:4000/user/getusergames/${userId})
//       setGames(response.data)
//     } catch (err) {
//       console.error('Error fetching user games:', err)
//       setError('Failed to fetch user games')
//     }
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       await Promise.all([fetchUserGames(), fetchUserDetails()])
//       setLoading(false)
//     }

//     fetchData()
//   }, [])

//   const tabVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
//   }

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gray-100">
//         <Card className="w-full max-w-4xl">
//           <CardHeader>
//             <Skeleton className="h-8 w-3/4" />
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <Skeleton className="h-4 w-full" />
//               <Skeleton className="h-4 w-5/6" />
//               <Skeleton className="h-4 w-4/6" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

// Monish, [27-10-2024 11:03 AM]
// return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
//       <Card className="mx-auto w-full max-w-4xl overflow-hidden">
//         <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
//           <div className="flex items-center justify-between">
//             <CardTitle className="text-3xl font-bold">User Dashboard</CardTitle>
//             <Avatar className="h-16 w-16 cursor-pointer" onClick={() => setActiveTab('profile')}>
//               <AvatarImage src="/placeholder.svg" alt="User Avatar" />
//               <AvatarFallback>UN</AvatarFallback>
//             </Avatar>
//           </div>
//         </CardHeader>
//         <CardContent className="p-0">
//           <div className="flex border-b">
//             <Button
//               variant={activeTab === 'profile' ? 'default' : 'ghost'}
//               className="flex-1 rounded-none py-6"
//               onClick={() => setActiveTab('profile')}
//             >
//               <User className="mr-2" /> Profile
//             </Button>
//             <Button
//               variant={activeTab === 'games' ? 'default' : 'ghost'}
//               className="flex-1 rounded-none py-6"
//               onClick={() => setActiveTab('games')}
//             >
//               <Gamepad className="mr-2" /> My Games
//             </Button>
//             <Button
//               variant={activeTab === 'certificates' ? 'default' : 'ghost'}
//               className="flex-1 rounded-none py-6"
//               onClick={() => setActiveTab('certificates')}
//             >
//               <Award className="mr-2" /> Certificates
//             </Button>
//             <Button
//               variant={activeTab === 'chat' ? 'default' : 'ghost'}
//               className="flex-1 rounded-none py-6"
//               onClick={() => setActiveTab('chat')}
//             >
//               <MessageCircle className="mr-2" /> Chat
//             </Button>
//           </div>
//           <AnimatePresence mode="wait">
//             {activeTab === 'profile' && userDetails && (
//               <motion.div
//                 key="profile"
//                 variants={tabVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className="p-6"
//               >
//                 <h2 className="mb-4 text-2xl font-bold">User Profile</h2>
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Unique Code</p>
//                     <p className="text-lg font-semibold">{userDetails.uniquecode}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Email</p>
//                     <p className="text-lg font-semibold">{userDetails.email}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-gray-500">Age</p>
//                     <p className="text-lg font-semibold">{userDetails.age}</p>
//                   </div>
//                   <div>
//                     <p className="mb-2 text-sm font-medium text-gray-500">Points</p>
//                     {userDetails.points && userDetails.points.length > 0 ? (
//                       <div className="flex flex-wrap gap-2">
//                         {userDetails.points.map((point, index) => (
//                           <Badge key={index} variant="secondary" className="text-lg">
//                             {point.game}: {point.points}
//                           </Badge>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-gray-400">No points available.</p>
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//             {activeTab === 'games' && (
//               <motion.div
//                 key="games"
//                 variants={tabVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className="p-6"
//               >

// Monish, [27-10-2024 11:03 AM]
// <h2 className="mb-4 text-2xl font-bold">My Games</h2>
//                 <ScrollArea className="h-[500px] pr-4">
//                   <div className="space-y-6">
//                     {games.map((game, index) => (
//                       <Card key={index} className="overflow-hidden">
//                         <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
//                           <CardTitle>{game.eventname}</CardTitle>
//                           <CardDescription className="text-green-100">
//                             {game.Location} | Players: {game.number_of_players}
//                           </CardDescription>
//                         </CardHeader>
//                         <CardContent className="p-4">
//                           <div className="mb-4 grid grid-cols-2 gap-4">
//                             <div>
//                               <p className="text-sm font-medium text-gray-500">Start Time</p>
//                               <p>{new Date(game.start_time).toLocaleString()}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm font-medium text-gray-500">End Time</p>
//                               <p>{new Date(game.end_time).toLocaleString()}</p>
//                             </div>
//                             <div>
//                               <p className="text-sm font-medium text-gray-500">Status</p>
//                               <Badge variant={game.status === 'Active' ? 'default' : 'secondary'}>
//                                 {game.status}
//                               </Badge>
//                             </div>
//                             <div>
//                               <p className="text-sm font-medium text-gray-500">Game Type</p>
//                               <div className="flex gap-2">
//                                 {game.singleplayer && <Badge variant="outline">Single Player</Badge>}
//                                 {game.multiplayer && <Badge variant="outline">Multiplayer</Badge>}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="mb-4">
//                             <p className="mb-2 text-sm font-medium text-gray-500">Judges</p>
//                             <div className="flex flex-wrap gap-2">
//                               {game.judges.map((judge, judgeIndex) => (
//                                 <Badge key={judgeIndex} variant="secondary">
//                                   {judge.name}
//                                 </Badge>
//                               ))}
//                             </div>
//                           </div>
//                           <div>
//                             <p className="mb-2 text-sm font-medium text-gray-500">Teams</p>
//                             <div className="space-y-4">
//                               {game.teams.map((team, teamIndex) => (
//                                 <Card key={teamIndex}>
//                                   <CardHeader>
//                                     <CardTitle className="text-lg">{team.teamNickname}</CardTitle>
//                                     <CardDescription>
//                                       Corporate Code: {team.corporatecode} | Points: {team.points}
//                                     </CardDescription>
//                                   </CardHeader>
//                                   <CardContent>
//                                     <p className="mb-2 text-sm font-medium text-gray-500">Players</p>
//                                     <div className="flex flex-wrap gap-2">
//                                       {team.players.map((player, playerIndex) => (
//                                         <Badge key={playerIndex} variant="outline">
//                                           {player.id} ({player.uniquecode})
//                                         </Badge>
//                                       ))}
//                                     </div>
//                                   </CardContent>
//                                 </Card>

// Monish, [27-10-2024 11:03 AM]
// ))}
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </ScrollArea>
//               </motion.div>
//             )}
//             {activeTab === 'certificates' && (
//               <motion.div
//                 key="certificates"
//                 variants={tabVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className="p-6"
//               >
//                 <h2 className="mb-4 text-2xl font-bold">My Certificates</h2>
//                 <p>Certificate content will be displayed here.</p>
//               </motion.div>
//             )}
//             {activeTab === 'chat' && (
//               <motion.div
//                 key="chat"
//                 variants={tabVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className="p-6"
//               >
//                 <h2 className="mb-4 text-2xl font-bold">Chat</h2>
//                 <p>Chat interface will be implemented here.</p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }