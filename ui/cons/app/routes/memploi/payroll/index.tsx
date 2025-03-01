import { useTabs } from "~/providers/TabsProvider";
import { Tabs } from "~/routes/Tabs";



function Index() {
   const { tabs } = useTabs() as any;
  return (
    <Tabs tabs={ tabs } />
  )
}

export default Index;