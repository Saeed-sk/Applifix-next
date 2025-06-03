'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation";

export function LimitModal({open}: { open: boolean }) {
    const router = useRouter()
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
            </AlertDialogTrigger>
            <AlertDialogContent className={'bg-light-100'}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Free Usage Limit Reached</AlertDialogTitle>
                    <AlertDialogDescription>
                        You have reached the limit of free usage. Please register to continue using this service.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => router.push('/register')}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
