import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "@mantine/form";

import { Area, Pre } from "@/lib/routes/types";
import { Button, Group, TextInput } from "@mantine/core";

type Props = {
  area?: Pre<Area>;
  onSubmit: (area: Pre<Area>) => void;
};

export function AreaForm(props: Props) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: props.area,
    validate: {
      name: (value) => (value.length > 0 ? null : "Name can not be empty"),
      country: (value) =>
        value.length > 0 ? null : "Country can not be empty",
    },
  });

  return (
    <form onSubmit={form.onSubmit(props.onSubmit)}>
      <TextInput
        withAsterisk
        label="Name"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <TextInput
        withAsterisk
        label="Country"
        key={form.key("country")}
        {...form.getInputProps("country")}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
    // <Form {...form}>
    //   <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-8">
    //     <FormField
    //       control={form.control}
    //       name="name"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Area</FormLabel>
    //           <FormControl>
    //             <Input {...field} />
    //           </FormControl>
    //           <FormDescription>The name of the climbing area</FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     ></FormField>

    //     <FormField
    //       control={form.control}
    //       name="country"
    //       render={({ field }) => (
    //         <FormItem>
    //           <FormLabel>Country</FormLabel>
    //           <FormControl>
    //             <Input {...field} />
    //           </FormControl>
    //           <FormDescription>
    //             The country of the climbing area
    //           </FormDescription>
    //           <FormMessage />
    //         </FormItem>
    //       )}
    //     />
    //     <Button type="submit">Submit</Button>
    //   </form>
    // </Form>
  );
}
