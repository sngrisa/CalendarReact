import { ITermsAndUse } from '../termsanduse';
import "./itemtermsandUse.scss";

const Itemtermsanduse = ({ itemTermAndUse }: { itemTermAndUse: ITermsAndUse }) => {
    return (
        <>
            <div className="w-full lg:w-9/12 px-4 mb-4">
                <h3 className='font-bold uppercase mb-4 mt-4 text-2xl text-purple-950 flex items-center justify-center'><span className='mr-2 text-purple-600'>{itemTermAndUse.icon}</span>{itemTermAndUse.title}</h3>
                <p className="mb-4 text-lg leading-relaxed text-black font-semibold">
                    {itemTermAndUse.desc}
                </p>
            </div>
        </>
    )
}

export default Itemtermsanduse;