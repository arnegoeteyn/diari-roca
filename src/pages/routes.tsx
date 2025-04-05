import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useRoutes from "@/hooks/useRoutes";
import { ArrowRight, Edit, Trash } from "lucide-react";
import { Link } from "react-router-dom";

export default function Routes() {
  const [routes, loading] = useRoutes();

  return (
    <div>
      <h1>Welcome to your routes</h1>
      <h2>Loading: {loading ? "loading" : "not loading"}</h2>

      <Table>
        <TableCaption>An overview of your routes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Grade</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Kind</TableHead>
            <TableHead>Ascents</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {routes.map((route) => (
            <TableRow key={route.route.id}>
              <TableCell className="font-medium">{route.route.grade}</TableCell>
              <TableCell>{route.route.name}</TableCell>
              <TableCell>{route.route.kind}</TableCell>
              <TableCell className="text-right">
                {route.ascents.length}
              </TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Button>
                    <Edit />
                  </Button>
                  <Button>
                    <Trash />
                  </Button>
                  <Link
                    to={`/routes/${route.route.id}`}
                    className={buttonVariants()}
                  >
                    <ArrowRight></ArrowRight>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <ul>
        {routes.map((route) => (
          <li key={route.route.id}>{route.route.name}</li>
        ))}
      </ul>
    </div>
  );
}
