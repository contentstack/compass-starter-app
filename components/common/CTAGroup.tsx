import { Link } from '@/components'
import { CallToAction } from '@/types/app'

const CTAGroup = (cta_group: { call_to_action?: CallToAction[] }) => (<>
    {cta_group && <div className=' lg:h-24 py-[1.594rem] bg-stone absolute lg:relative bottom-0 left-0 w-full '>
        <div className='dark flex flex-col lg:flex-row items-center justify-center gap-x-[1.375rem] gap-y-4 lg:gap-y-0 '>
            {cta_group?.call_to_action?.map((ctaItem:CallToAction) => (
                <Link
                    key={ctaItem.text}
                    url={ctaItem?.internal_link?.[0] ? ctaItem?.internal_link?.[0]?.url : ctaItem?.external_link || ''}
                    className='btn-primary !md-extra-wide !px-[1.875rem]'
                    $={ctaItem?.$?.text}
                >
                    {/*  eslint-disable-next-line @next/next/no-img-element */}
                    {ctaItem?.icon?.url && <img
                        src={ctaItem.icon.url}
                        alt={ctaItem.icon.title}
                        className='h-6 flex-none dark:text-white text-stone mr-[0.625rem]'
                        aria-hidden='true' />}
                    {ctaItem.text}
                </Link>

            ))}
        </div>
    </div>}
</>)

export {CTAGroup}