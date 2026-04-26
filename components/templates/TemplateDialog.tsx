import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TemplateDialog({trigger}:{trigger:React.ReactNode}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Choose a Template
          </DialogTitle>
          <div className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
hy i am content 
Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ut nemo ratione error, qui sunt reprehenderit ab? Veritatis nobis quia libero officiis magnam velit iure non voluptatem rerum obcaecati culpa excepturi, labore in enim numquam vel, praesentium reiciendis expedita quae modi. Ex nulla doloribus omnis reiciendis pariatur adipisci maxime rem, magnam ea cumque unde harum sit dolores temporibus mollitia vero, fuga dicta ab vitae, in aliquid fugit! Asperiores voluptas veritatis saepe vel, et reiciendis consectetur accusantium sequi blanditiis ratione a ea explicabo non aspernatur officia quae dolorem minima id dicta repudiandae? Tenetur totam modi iste nesciunt facilis, aliquam, debitis repudiandae sit soluta eum dolorum ex saepe rerum harum libero reprehenderit expedita neque mollitia est eius explicabo commodi at architecto voluptas. Omnis vitae mollitia fuga hic dignissimos fugiat rerum! Ullam inventore et quaerat rem dolorum accusamus excepturi saepe, nam dicta nulla eum pariatur, voluptates in itaque ipsam natus quasi fugiat assumenda sequi libero. Vitae pariatur libero ab temporibus fugit similique ipsa provident ea quos. Totam vero blanditiis ad veritatis non animi, eum, voluptate incidunt possimus unde minus molestiae fugiat voluptates nulla ex itaque! Porro odit minima vel architecto sint similique, harum consequatur numquam nobis ipsa ab voluptatum odio placeat neque hic at aut quaerat dolorum tempora. Aliquid perspiciatis doloremque dolorum temporibus amet voluptas vel veritatis cupiditate saepe incidunt numquam cumque perferendis laboriosam eaque fugit sed quam accusantium nulla minima odio sint quae esse, eveniet quaerat. Cupiditate, consectetur adipisci quis officiis reprehenderit itaque voluptatem recusandae doloremque illo, quasi harum similique minima nam velit quo natus culpa impedit? Ipsum, cumque suscipit hic obcaecati quia illo fugit laborum voluptates perspiciatis inventore voluptatem ipsa delectus sit sint consequuntur! Molestiae consectetur hic molestias modi deserunt minus voluptate sunt, saepe, nobis ullam porro eos fugit laboriosam dolores, quis alias obcaecati nam! Blanditiis corporis dolorem, nostrum, nemo soluta, temporibus recusandae autem inventore esse eos repudiandae quibusdam veritatis dolore labore deserunt. Optio animi quibusdam officiis aut, eveniet accusantium culpa assumenda delectus excepturi nesciunt omnis facilis id vero dignissimos officia ipsum, quam iusto, aspernatur harum voluptatem pariatur velit? Optio libero alias vitae laboriosam vel, illo cum quod aperiam maxime quibusdam voluptates quos temporibus, expedita possimus ex nemo voluptatibus. Quasi beatae natus sequi quod odit? Eos cupiditate rerum dolore perspiciatis aliquam voluptates, quisquam molestias ratione, sit repellendus distinctio reiciendis, maiores expedita natus asperiores? Dolorem deserunt veritatis, tenetur labore necessitatibus odio iusto, ea vero dignissimos quos, iste aspernatur praesentium deleniti alias eos. Eius quis officia, vitae nemo facere quas magnam ducimus possimus. Hic ipsam perferendis odio animi voluptas molestias numquam perspiciatis natus eos et. Id pariatur ullam iusto, cupiditate iste, sapiente dignissimos magnam voluptas veritatis aut consectetur temporibus ipsa blanditiis itaque earum ipsam quos quasi sed totam. Doloribus quod corporis inventore dolore aut illo ullam, maxime tempora repellat illum alias sed cupiditate neque quam cum velit. Possimus a, odit numquam aperiam sunt qui consequatur! Veritatis minima perspiciatis molestias sint impedit. Sapiente vitae consequuntur hic excepturi suscipit perferendis dolorum tempora reprehenderit laudantium placeat ipsum dolores molestias voluptates ducimus explicabo eligendi odit, laboriosam numquam?
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
