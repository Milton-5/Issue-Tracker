const loadData = (status) => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {
            const issues = json.data;
            let filteredIssues = issues;

            if (status === "open") {
                filteredIssues = issues.filter((issue) => issue.status === "open");
            }

            if (status === "closed") {
                filteredIssues = issues.filter((issue) => issue.status === "closed");
            }

            displayIssues(filteredIssues);
            displayData(filteredIssues);
        });
};

const displayIssues = (datas) => {
    const issueContain = document.getElementById("issue-stats");
    issueContain.innerHTML = "";
    issueContain.innerHTML = `
    <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
            <img src="assets/Aperture.png" alt="" class="fa-solid fa-circle-dot text-lg"> 
        </div>
        <div>
            <h1 class="total-issues text-xl font-bold text-gray-800">${datas.length} Issues</h1>
            <p class="text-sm text-gray-500">Track and manage your project issues</p>
        </div>
    </div>
    
    <div class="flex items-center gap-4 text-xs font-medium">
        <span class="flex items-center gap-1.5 text-gray-600">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Open
        </span>
        <span class="flex items-center gap-1.5 text-gray-600">
            <span class="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Closed
        </span>
    </div>`;
};

const displayData = (issues) => {
    const issueContainer = document.getElementById("issue-container");
    issueContainer.innerHTML = "";

    issues.forEach((issue) => {
        const card = document.createElement("div");

        // Card Click Handler & Pointer Style
        card.setAttribute("onclick", `loadIssueDetail(${issue.id})`);
        card.className = "cursor-pointer";

        card.innerHTML = `
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow h-full">
            <div class="h-1 
                ${issue.status === "open"
                    ? "bg-[#00A96E]"
                    : issue.status === "closed"
                    ? "bg-[#A855F7]"
                    : "bg-gray-100"}">
            </div>
            <div class="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-center mb-3">
                        <div class="w-7 h-7 rounded-full flex items-center justify-center text-emerald-600 text-xs">
                            <img src="${issue.status === "open" ? "assets/Open-Status.png" : "assets/Closed-Status.png"}">
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide
                            ${issue.priority === "low"
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
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${index === 0 ? "bg-red-50 text-red-500 border border-red-200" : "bg-amber-50 text-amber-600 border border-amber-200"}">
                            <img src="${index === 0 ? "assets/Screenshot 2026-08-03 130035.png" : "assets/Screenshot 2026-08-03 130048.png"}" alt="${label}" class="w-3 h-3 object-contain">
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

// Single Issue Fetch & Modal Show Function
const loadIssueDetail = (id) => {
    const modal = document.getElementById("issue_modal");
    const modalContent = document.getElementById("modal-content");

    // Modal Spinner State
    modalContent.innerHTML = `
        <div class="flex justify-center items-center py-12">
            <span class="loading loading-spinner loading-md text-indigo-600"></span>
        </div>
    `;
    modal.showModal();

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then((res) => res.json())
        .then((json) => {
            const issue = json.data || json;
            const isOpen = issue.status === "open";

            modalContent.innerHTML = `
                <h3 class="font-bold text-xl text-gray-900 mb-2">${issue.title}</h3>

                <div class="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <span class="px-2.5 py-0.5 rounded-full text-[11px] font-medium capitalize ${
                        isOpen ? "bg-emerald-100 text-emerald-600" : "bg-purple-100 text-purple-600"
                    }">${issue.status}</span>
                    <span>•</span>
                    <span>Opened by <strong class="text-gray-700">${issue.author}</strong></span>
                    <span>•</span>
                    <span>${new Date(issue.createdAt).toLocaleDateString("en-US")}</span>
                </div>

                <div class="flex flex-wrap gap-1.5 mb-4">
                    ${(issue.labels || []).map((label, index) => `
                        <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-semibold ${index === 0 ? "bg-red-50 text-red-500 border border-red-200" : "bg-amber-50 text-amber-700 border border-amber-200"} uppercase">
                            <img src="${index === 0 ? "assets/Screenshot 2026-08-03 130035.png" : "assets/Screenshot 2026-08-03 130048.png"}" alt="${label}" class="w-3 h-3 object-contain">
                            ${label}
                        </span>
                    `).join("")}
                </div>

                <p class="text-sm text-gray-600 leading-relaxed mb-6 border-y border-gray-100 py-4">
                    ${issue.description}
                </p>

                <div class="flex justify-between items-center bg-gray-50 p-3.5 rounded-lg border border-gray-100 text-xs">
                    <div>
                        <span class="text-gray-400 block text-[10px] uppercase font-semibold">Assignee</span>
                        <span class="font-bold text-gray-800 text-sm">${issue.assignee ? issue.assignee : "Unassigned"}</span>
                    </div>
                    <div class="text-right">
                        <span class="text-gray-400 block text-[10px] uppercase font-semibold">Priority</span>
                        <span class="font-bold text-xs uppercase px-2 py-0.5 rounded ${
                            issue.priority === "high" ? "bg-red-100 text-red-500" :
                            issue.priority === "medium" ? "bg-yellow-100 text-yellow-600" : "bg-gray-200 text-gray-600"
                        }">${issue.priority}</span>
                    </div>
                </div>

                <div class="modal-action mt-6">
                    <form method="dialog">
                        <button class="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white border-none px-5">Close</button>
                    </form>
                </div>
            `;
        })
        .catch((err) => {
            modalContent.innerHTML = `<p class="text-red-500 text-center py-6">Failed to load issue details.</p>`;
        });
};

loadData("all");