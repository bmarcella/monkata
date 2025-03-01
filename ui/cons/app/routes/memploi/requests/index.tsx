import { useTabs } from "~/providers/TabsProvider";
import { Tabs } from "~/routes/Tabs";



function Index() {
   const { tabs } = useTabs() as any;
   console.log("New Tabs |-> ", tabs);
   console.log(tabs);
  return (
    <Tabs tabs={ tabs } />
  )
}

export default Index;