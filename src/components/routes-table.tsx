import { RouteOverview } from "@/lib/routes/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Edit, Trash, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "./ui/button";

type Props = {
  routes: RouteOverview[];
  showKind?: boolean;
};

export default function RouteTable(props: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Grade</TableHead>
          <TableHead className="text-center">Name</TableHead>
          {props.showKind && <TableHead>Kind</TableHead>}
          <TableHead className="text-center">Ascents</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.routes.map((route) => (
          <TableRow key={route.route.id}>
            <TableCell className="font-medium">{route.route.grade}</TableCell>
            <TableCell className="text-center">{route.route.name}</TableCell>
            {props.showKind && <TableCell>{route.route.kind}</TableCell>}
            <TableCell className="text-center">
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
    </Table>
  );
}
