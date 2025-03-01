
import { Tabs } from "~/routes/Tabs";
import { useTabs } from "~/providers/TabsProvider";


function employee() {
 
  const { tabs } = useTabs() as any;
  return (
    <Tabs tabs={tabs} />
  )
 
}

export default employee;