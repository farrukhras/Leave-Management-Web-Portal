import { FaEnvelope } from 'react-icons/fa';
import { IoNotifications, IoSettings } from "react-icons/io5";
import Image from 'next/image';
import user from '../../public/assets/user.png';
import { useRouter } from 'next/router';

export default function Header() {
	const router = useRouter();

	function handleLogout() {
		// BONUS TASK: on clicking user menu it shows an option of logout
		localStorage.removeItem('auth_token');
		router.push('/');
	};

	return (
		<header className="flex justify-between items-center py-4 px-6 shadow-md">
			<div>
				<h2 className="text-lg font-semibold text-gray-800">Welcome back, Farrukh</h2>
			</div>
			<div className="flex items-center space-x-4">
				<div className="flex items-center space-x-4">
					<IoSettings className="text-gray-600 cursor-pointer" />
					<FaEnvelope className="text-gray-600 cursor-pointer" />
					<IoNotifications className="text-gray-600 cursor-pointer" />
				</div>
				<div className="ml-4" title="Logout">
					<div>
						<Image
							src={user}
							className="w-10 h-10 rounded-full cursor-pointer"
							onClick={handleLogout}
							alt="User Profile"
						/>
					</div>
				</div>
			</div>
		</header>
	);
};
