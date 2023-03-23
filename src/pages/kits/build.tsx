import Layout from '@/components/Layout'
import Input from '@/components/Input'
import { InteractiveItemList, InteractiveItemListSearchBox } from '@/components/InteractiveItemList';
import MockData from '@/utils/mock_data';

const Build = () => {
    return (
        <Layout className="mr-3">
            <div className="flex flex-col">
                <span className="text-lg">
                    Create a new kit
                </span>
                <Input
                    name="name"
                    placeholder="enter a name"
                    className=""
                    style={{ maxWidth: "250px" }} />

                <InteractiveItemList data={MockData}>
                    <InteractiveItemListSearchBox/>
                </InteractiveItemList>
            </div>
        </Layout>
    );
}

export default Build;