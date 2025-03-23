import type { JSX, ParentComponent } from "solid-js";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

const FormLayout: ParentComponent<{ title: string ,footer:JSX.Element}> = (props) => {
  return (
    <section class="h-screen flex items-center justify-center">
  
        <Card class="w-96">
          <CardHeader class="text-center">
           <CardTitle class="text-2xl"> Keeper</CardTitle>
           <CardDescription>
{props.title}
           </CardDescription>
          </CardHeader>
         
         <CardContent>
           {props.children}
         </CardContent>
         <CardFooter>
          {props.footer}
         </CardFooter>
        </Card>
    
    </section>
  );
};

export default FormLayout;
