import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Area, Pre } from "@/lib/routes/types";

type Props = {
  area: Pre<Area>;
  onSubmit: (area: Pre<Area>) => void;
};

const formSchema = z.object({
  name: z.string().nonempty(),
  country: z.string().nonempty(),
});

export function AreaForm(props: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: props.area,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>The name of the climbing area</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The country of the climbing area
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
