const loadData = () => {
   fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues") 
   .then( (res) => res.json()) // promise of json data
   .then((json) => displayData(json.data)); // log the json data
}

const displayData = (issues) => {

    const issueContainer = document.getElementById("issue-container");

    issueContainer.innerHTML = "";

    issues.forEach((issue) => {

        const card = document.createElement("div");

        card.innerHTML = `
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                <div class="h-1 
                ${ issue.status === "open"
                 ? "bg-[#00A96E]"
                :issue.status === "closed"
                ?"bg-[#A855F7]"
                :"bg-gray-100" }">
        </div>
                <div class="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex justify-between items-center mb-3">
                            <div class="w-7 h-7 rounded-full  flex items-center justify-center text-emerald-600 text-xs">
                                <img  class=""
                                      src="${issue.status === "open" 
                                      ? "assets/Open-Status.png" 
                                      : "assets/Closed-Status.png"}">
                                </img>
                            </div>
                            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide
                             ${ issue.priority === "low"
                              ? "bg-gray-100 text-gray-500"
                              : issue.priority === "medium"
                              ? "bg-yellow-100 text-yellow-500"
                              : issue.priority === "high"
                              ? "bg-red-100 text-red-500"
                              : "bg-gray-100 text-gray-500"}">
                               ${issue.priority}
                              </span>
                        </div>
                        <h3 class="font-semibold text-gray-800 text-sm leading-snug mb-2">${issue.title}</h3>
                        <p class="text-xs text-gray-500 line-clamp-2 mb-4">${issue.description}</p>
                    </div>

                    <div class="flex flex-wrap gap-1.5 mb-4">
                      ${issue.labels.map((label, index) => `
                         <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold  ${index === 0 ? "bg-red-50 text-red-500 border border-red-200" : "bg-amber-50 text-amber-600 border border-amber-200"}">
                         <img src="${index === 0 ? "assets/Screenshot 2026-08-03 130035.png" : "assets/Screenshot 2026-08-03 130048.png"}"alt="${label}"class="w-3 h-3 object-contain">
                         ${label}
                        </span>
                       `).join("")}
                   </div> 
                </div>

                <div class="border-t border-gray-100 px-4 py-2.5 bg-gray-50/50 text-[11px] text-gray-400 flex flex-col justify-between items-start">
                    <span>#${issue.id} by ${issue.author}</span>
                    <span>${new Date(issue.createdAt).toLocaleDateString("en-US")}</span>
                </div>
            </div>
        `;

        issueContainer.append(card);
    });
};
loadData();