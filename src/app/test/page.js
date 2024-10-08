"use client";
import Image from "next/image";
import Link from "next/link";
import {
	File,
	Home,
	LineChart,
	ListFilter,
	MoreHorizontal,
	Package,
	Package2,
	PanelLeft,
	PlusCircle,
	Search,
	Settings,
	ShoppingCart,
	Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Dashboard() {
	const createdAt = (date) => {
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};
	const router = useRouter();
	const [recipes, setRecipes] = useState([]);
	const [categories, setCategories] = useState([]);
	const [filteredRecipes, setFilteredRecipes] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all");

	const fetchRecipes = async () => {
		const response = await fetch("/api/v1/recipes");
		const data = await response.json();
		if (response.status === 200) {
			setRecipes(data.data.recipes);
			setFilteredRecipes(data.data.recipes);
		}
	};

	const fetchCategories = async () => {
		const response = await fetch("/api/v1/category");
		const data = await response.json();
		if (response.status === 200) {
			setCategories(data.data);
		}
	};

	const onCategoryChange = (event) => {
		const category = event.target.value;
		setSelectedCategory(category);
	};

	useEffect(() => {
		fetchRecipes();
		fetchCategories();
	}, []);

	useEffect(() => {
		if (selectedCategory === "all") {
			setFilteredRecipes(recipes);
		} else {
			const filtered = recipes.filter(
				(recipe) => recipe.category.name === selectedCategory
			);
			setFilteredRecipes(filtered);
		}
	}, [selectedCategory, recipes]);

	const onDelete = (id) => {
		const updatedRecipes = recipes.filter((recipe) => recipe._id !== id);
		setRecipes(updatedRecipes);
		setFilteredRecipes(updatedRecipes);
	};

	const onView = (id) => {
		router.push(`/dashboard/manage-recipes/${id}`);
	};

	const onEdit = (recipe) => {
		router.push(`/dashboard/manage-recipes/${recipe._id}/edit`);
	};
	return (
		<TooltipProvider>
			<div className="flex min-h-screen w-full flex-col bg-muted/40">
				<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
					<nav className="flex flex-col items-center gap-4 px-2 py-4">
						<Link
							href="#"
							className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
							<Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
							<span className="sr-only">Acme Inc</span>
						</Link>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href="#"
									className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
									<Home className="h-5 w-5" />
									<span className="sr-only">Dashboard</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">Dashboard</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href="#"
									className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8">
									<ShoppingCart className="h-5 w-5" />
									<span className="sr-only">Orders</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">Orders</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href="#"
									className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
									<Package className="h-5 w-5" />
									<span className="sr-only">Products</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">Products</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href="#"
									className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
									<Users2 className="h-5 w-5" />
									<span className="sr-only">Customers</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">Customers</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href="#"
									className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
									<LineChart className="h-5 w-5" />
									<span className="sr-only">Analytics</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">Analytics</TooltipContent>
						</Tooltip>
					</nav>
					<nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href="#"
									className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
									<Settings className="h-5 w-5" />
									<span className="sr-only">Settings</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent side="right">Settings</TooltipContent>
						</Tooltip>
					</nav>
				</aside>
				<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
					<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
						<Sheet>
							<SheetTrigger asChild>
								<Button size="icon" variant="outline" className="sm:hidden">
									<PanelLeft className="h-5 w-5" />
									<span className="sr-only">Toggle Menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="sm:max-w-xs">
								<nav className="grid gap-6 text-lg font-medium">
									<Link
										href="#"
										className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
										<Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
										<span className="sr-only">Acme Inc</span>
									</Link>
									<Link
										href="#"
										className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
										<Home className="h-5 w-5" />
										Dashboard
									</Link>
									<Link
										href="#"
										className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
										<ShoppingCart className="h-5 w-5" />
										Orders
									</Link>
									<Link
										href="#"
										className="flex items-center gap-4 px-2.5 text-foreground">
										<Package className="h-5 w-5" />
										Products
									</Link>
									<Link
										href="#"
										className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
										<Users2 className="h-5 w-5" />
										Customers
									</Link>
									<Link
										href="#"
										className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
										<LineChart className="h-5 w-5" />
										Settings
									</Link>
								</nav>
							</SheetContent>
						</Sheet>
						<Breadcrumb className="hidden md:flex">
							<BreadcrumbList>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link href="#">Dashboard</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link href="#">Products</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbPage>All Products</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
						<div className="relative ml-auto flex-1 md:grow-0">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search..."
								className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
							/>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									size="icon"
									className="overflow-hidden rounded-full">
									<Image
										src="/placeholder-user.jpg"
										width={36}
										height={36}
										alt="Avatar"
										className="overflow-hidden rounded-full"
									/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem>Support</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</header>
					<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
						<Tabs defaultValue="all">
							<div className="flex items-center">
								<TabsList>
									<TabsTrigger value="all">All</TabsTrigger>
									<TabsTrigger value="active">Active</TabsTrigger>
									<TabsTrigger value="draft">Draft</TabsTrigger>
									<TabsTrigger value="archived" className="hidden sm:flex">
										Archived
									</TabsTrigger>
								</TabsList>
								<div className="ml-auto flex items-center gap-2">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="outline" size="sm" className="h-7 gap-1">
												<ListFilter className="h-3.5 w-3.5" />
												<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
													Filter
												</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>Filter by</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuCheckboxItem checked>
												Active
											</DropdownMenuCheckboxItem>
											<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
											<DropdownMenuCheckboxItem>
												Archived
											</DropdownMenuCheckboxItem>
										</DropdownMenuContent>
									</DropdownMenu>
									<Button size="sm" variant="outline" className="h-7 gap-1">
										<File className="h-3.5 w-3.5" />
										<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
											Export
										</span>
									</Button>
									<Button size="sm" className="h-7 gap-1">
										<PlusCircle className="h-3.5 w-3.5" />
										<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
											Add Product
										</span>
									</Button>
								</div>
							</div>
							<TabsContent value="all">
								<Card x-chunk="dashboard-06-chunk-0">
									<CardHeader>
										<CardTitle>Products</CardTitle>
										<CardDescription>
											Manage your products and view their sales performance.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead className="hidden w-[100px] sm:table-cell">
														<span className="sr-only">Image</span>
													</TableHead>
													<TableHead>Name</TableHead>
													<TableHead>Status</TableHead>
													<TableHead>Category</TableHead>
													<TableHead className="hidden md:table-cell">
														Total Sales
													</TableHead>
													<TableHead className="hidden md:table-cell">
														Created at
													</TableHead>
													<TableHead>
														<span className="sr-only">Actions</span>
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{recipes.map((recipe) => {
													return (
														<TableRow key={recipe._id}>
															<TableCell className="hidden sm:table-cell">
																<Image
																	alt="Product image"
																	className="aspect-square rounded-md object-cover"
																	height="64"
																	src={recipe.imageUrl}
																	width="64"
																/>
															</TableCell>
															<TableCell className="font-medium">
																{recipe.title}
															</TableCell>
															<TableCell>
																<Badge variant="outline">Draft</Badge>
															</TableCell>
															<TableCell>{recipe.category.name}</TableCell>
															<TableCell className="hidden md:table-cell">
																{recipe.author.name || "Anonymous"}
															</TableCell>
															<TableCell className="hidden md:table-cell">
																{createdAt(recipe.createdAt)}
															</TableCell>
															<TableCell>
																<DropdownMenu>
																	<DropdownMenuTrigger asChild>
																		<Button
																			aria-haspopup="true"
																			size="icon"
																			variant="ghost">
																			<MoreHorizontal className="h-4 w-4" />
																			<span className="sr-only">
																				Toggle menu
																			</span>
																		</Button>
																	</DropdownMenuTrigger>
																	<DropdownMenuContent align="end">
																		<DropdownMenuLabel>
																			Actions
																		</DropdownMenuLabel>
																		<DropdownMenuItem>Edit</DropdownMenuItem>
																		<DropdownMenuItem>Delete</DropdownMenuItem>
																	</DropdownMenuContent>
																</DropdownMenu>
															</TableCell>
														</TableRow>
													);
												})}
											</TableBody>
										</Table>
									</CardContent>
									<CardFooter>
										<div className="text-xs text-muted-foreground">
											Showing <strong>1-10</strong> of{" "}
											<strong>{recipes.length}</strong> products
										</div>
									</CardFooter>
								</Card>
							</TabsContent>
						</Tabs>
					</main>
				</div>
			</div>
		</TooltipProvider>
	);
}
