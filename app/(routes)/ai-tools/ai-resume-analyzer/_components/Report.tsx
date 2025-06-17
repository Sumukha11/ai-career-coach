import ResumeUploadDialogue from '@/app/(routes)/dashboard/_components/ResumeUploadDialogue';
import { Sparkle } from 'lucide-react';
import React, { useState } from 'react'

function Report({aiReport}:any) {
  
    const[openResumeUpload,setOpenResumeDialog]=useState(false);
    const getColorClasses = (score: number | undefined) => {
    if (score === undefined) {
      return {
        border: 'border-gray-300',
        bar: 'bg-gray-400',
        text: 'text-gray-600',
        halo: 'bg-gray-300'
      };
    }
    if (score >= 80) {
      return {
        border: 'border-green-500',
        bar: 'bg-green-600',
        text: 'text-green-700',
        halo: 'bg-green-600'
      };
    } else if (score >= 50) {
      return {
        border: 'border-yellow-500',
        bar: 'bg-yellow-600',
        text: 'text-yellow-700',
        halo: 'bg-yellow-600'
      };
    } else {
      return {
        border: 'border-red-500',
        bar: 'bg-red-600',
        text: 'text-red-700',
        halo: 'bg-red-600'
      };
    }
  };

  const sections = [
    { key: 'contact_info', icon: 'fas fa-user-circle', title: 'Contact Info' },
    { key: 'experience', icon: 'fas fa-briefcase', title: 'Experience' },
    { key: 'education', icon: 'fas fa-graduation-cap', title: 'Education' },
    { key: 'skills', icon: 'fas fa-lightbulb', title: 'Skills' }
  ];
  
  return (
<div className='p-2'>   
    <div className="flex justify-between items-center mb-6">

    <h2 className="text-2xl font-extrabold text-gray-800 gradient-component-text">AI Analysis Results</h2>

    <button
  type="button"
  onClick={() => setOpenResumeDialog(true)}
  className="inline-flex items-center px-2 py-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-pink-300"
>
  <Sparkle className="w-5 h-5 mr-2" /> Re-analyze
</button>


</div>





<div className="bg-gradient-to-tr from-[#BE575F] via-[#A338E3] to-[#AC76D6]  rounded-lg shadow-md p-6 mb-6 border border-blue-200 transform hover:scale-[1.01] transition-transform duration-300 ease-in-out">

    <h3 className="text-xl font-bold text-white mb-4 flex items-center">

        <i className="fas fa-star text-yellow-500 mr-2"></i> Overall Score

    </h3>

    <div className="flex items-center justify-between mb-4">

        <span className="text-6xl font-extrabold text-white">{aiReport?.overall_score}<span className="text-2xl">/100</span></span>

        <div className="flex items-center">

            <i className="fas fa-arrow-up text-green-500 text-lg mr-2"></i>

            <span className="text-yellow-400 text-lg font-bold">{aiReport?.overall_feedback}</span>

        </div>

    </div>

    <div className="w-full bg-gray-400 rounded-full h-2.5 mb-4">

        <div className="bg-white h-2.5 rounded-full" style={{width: '85%'}}></div>

    </div>

    <p className="text-gray-200 text-sm">{aiReport?.summary_comment} </p>

</div>

{/* Coloured Halo Added */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {sections.map(({ key, icon, title }) => {
          const section = aiReport?.sections?.[key];
          const { border, bar, text, halo } = getColorClasses(section?.score);

          return (
            <div
              key={key}
              className={`bg-white rounded-lg shadow-md p-5 border ${border} relative overflow-hidden group transition-all duration-300`}
            >
              {/* Halo effect */}
              <div
                className={`absolute inset-0 ${halo} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
              ></div>

              <h4 className={`text-lg font-semibold mb-3 ${text} relative z-10`}>
                <i className={`${icon} ${text} mr-2`}></i> {title}
              </h4>

              <span className={`text-4xl font-bold ${text} relative z-10`}>
                {section?.score ?? 'N/A'}
              </span>

              <p className={`text-sm mt-2 ${text} relative z-10`}>
                {section?.comment}
              </p>

              {/* Bottom bar */}
              <div
                className={`absolute inset-x-0 bottom-0 h-1 ${bar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
            </div>
          );
        })}
      </div>

<div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">

    <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center">

        <i className="fas fa-lightbulb text-orange-400 mr-2"></i> Tips for Improvement

    </h3>

    <ol className="list-none space-y-4">

        <li className="flex items-start">

            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3"><i className="fas fa-check"></i></span>

            <div>

                {/* <p className="font-semibold text-gray-800">Quantify Achievements:</p> */}

                <p className="text-gray-600 text-sm">{aiReport?.tips_for_improvement?.[0]}</p>

            </div>

        </li>

        <li className="flex items-start">

            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3"><i className="fas fa-check"></i></span>

            <div>

                {/* <p className="font-semibold text-gray-800">Keywords Optimization:</p> */}

                <p className="text-gray-600 text-sm">{aiReport?.tips_for_improvement?.[1]}</p>

            </div>

        </li>

        <li className="flex items-start">

            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3"><i className="fas fa-check"></i></span>

            <div>

                {/* <p className="font-semibold text-gray-800">Action Verbs:</p> */}

                <p className="text-gray-600 text-sm">{aiReport?.tips_for_improvement?.[2]}</p>

            </div>

        </li>
        <li className="flex items-start">

            <span className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-3"><i className="fas fa-check"></i></span>

            <div>

                {/* <p className="font-semibold text-gray-800">Action Verbs:</p> */}

                <p className="text-gray-600 text-sm">{aiReport?.tips_for_improvement?.[3]}</p>

            </div>

        </li>

    </ol>

</div>





<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

    <div className="bg-white rounded-lg shadow-md p-5 border border-green-200">

        <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">

            <i className="fas fa-hand-thumbs-up text-green-500 mr-2"></i> What's Good

        </h3>

        <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">

            <li>{aiReport?.whats_good?.[0]}</li>

            <li>{aiReport?.whats_good?.[1]}</li>

            <li>{aiReport?.whats_good?.[2]}</li>
            <li>{aiReport?.whats_good?.[3]}</li>

        </ul>

    </div>

    <div className="bg-white rounded-lg shadow-md p-5 border border-red-200">

        <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center">

            <i className="fas fa-hand-thumbs-down text-red-500 mr-2"></i> Needs Improvement

        </h3>

        <ul className="list-disc list-inside text-gray-600 text-sm space-y-2">

            <li>{aiReport?.needs_improvement?.[0]}</li>
            <li>{aiReport?.needs_improvement?.[1]}</li>
            <li>{aiReport?.needs_improvement?.[2]}</li>
            <li>{aiReport?.needs_improvement?.[3]}</li>

        </ul>

    </div>

</div>





<div className="bg-blue-600 text-white rounded-lg shadow-md p-6 mb-6 text-center gradient-button-bg">

    <h3 className="text-2xl font-bold mb-3">Ready to refine your resume? 💪</h3>

    <p className="text-base mb-4">Make your application stand out with our premium insights and features.</p>

    <button type="button" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-blue-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">

        Upgrade to Premium <i className="fas fa-arrow-right ml-2 text-blue-600"></i>

    </button>

    </div>
        <ResumeUploadDialogue openResumeUpload={openResumeUpload} setOpenResumeDialog={()=>setOpenResumeDialog(false)}/>
</div>
  )
}

export default Report
