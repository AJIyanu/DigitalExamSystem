'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

import { Calendar } from '@/components/ui/calendar';
// import DatePicker from 'react-datepicker';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
    lastName: z.string({
        required_error: 'Surname is required',
        invalid_type_error: 'Surname must be a string',
    }),
    firstName: z.string({
        required_error: 'firstname is required',
        invalid_type_error: 'firstname must be a string',
    }),
    middleName: z
        .string({
            invalid_type_error: 'middlename must be a string',
        })
        .optional(),
    sex: z.enum(['Male', 'Female'], {
        required_error: "Please select student's sex",
    }),
    dateOfBirth: z.date({
        required_error: 'Date of birth is required',
    }),
});

function InputForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            lastName: undefined,
            firstName: undefined,
            middleName: '',
            sex: undefined,
            dateOfBirth: undefined,
        },
    });

    const { toast } = useToast();

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await fetch(
                'http://localhost:8000/api/students/new/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();
            console.log(result.msg);
            toast({
                description: result.msg,
            });
        } catch (error) {
            console.error(error);
            toast({
                description: 'An error occurred',
            });
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                <div className="grid sm:grid-cols-2 gap-3 grid-cols-1">
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Surname</FormLabel>
                                <FormControl>
                                    <Input placeholder="lastname" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Firstname</FormLabel>
                                <FormControl>
                                    <Input placeholder="firstname" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid sm:grid-cols-5 gap-5 grid-cols-1">
                    <FormField
                        control={form.control}
                        name="middleName"
                        render={({ field }) => (
                            <FormItem className="col-span-3">
                                <FormLabel>Middlename</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="middlename"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sex"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Sex</FormLabel>
                                <Select onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose Student's sex" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="Female">
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem className="flex flex-col mt-4">
                            <FormLabel>Date of birth</FormLabel>
                            {/* <DatePicker
                                selected={field.value}
                                onSelect={field.onChange}
                                showYearDropdown
                                showMonthDropdown
                                dropdownMode="select"
                                className={cn(
                                    'border border-input rounded-md bg-background p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                                )}
                            /> */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'w-[240px] pl-3 text-left font-normal',
                                                !field.value &&
                                                    'text-muted-foreground'
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, 'PPP')
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        // scrollableYearDropdown={true}
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date('1900-01-01')
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}

export default function Page() {
    return (
        <div className=" flex flex-col p-4">
            <h1 className="text-3xl font-semibold">Add a Student</h1>
            <hr />
            <InputForm />
            <Toaster />
        </div>
    );
}
