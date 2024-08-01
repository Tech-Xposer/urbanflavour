
import Link from 'next/link';

export default function AdminDashboard() {
	return (
		<>
			<h1 className="text-3xl font-bold mb-6">Dashboard</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Link href="/dashboard/create-recipe">
					<p className="bg-blue-500 text-white p-4 rounded shadow hover:bg-blue-600">
						Create Recipe
					</p>
				</Link>
				<Link href="/dashboard/manage-recipes">
					<p className="bg-green-500 text-white p-4 rounded shadow hover:bg-green-600">
						Manage Recipes
					</p>
				</Link>
			</div>
		</>
	);
}
