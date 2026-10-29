# Generator for 30-Day Aviation & Business English Curriculum
import json

CURRICULUM_30_DAYS = [
    {
        "day": 1,
        "theme": "Sustainable Aviation Fuel (SAF) Strategy",
        "category": "Sustainability & ESG",
        "news": {
            "title": "Boeing and Major Carriers Accelerate 100% SAF Adoption Target",
            "article": "Boeing has announced an aggressive roadmap to ensure all commercial aircraft in its portfolio are certified to operate on 100% Sustainable Aviation Fuel (SAF) by 2030. Currently, commercial jet engines are limited to a 50% blend with conventional fossil kerosene due to aromatics and seal integrity specifications. Industry bodies like IATA emphasize that scaling SAF supply is the single most viable lever for achieving net-zero carbon emissions across international aviation by 2050, despite current production accounting for under 1% of global jet fuel demand.",
            "vocab": [
                {"word": "Sustainable Aviation Fuel (SAF)", "def": "Bio-based or synthetic drop-in fuel with significantly lower lifecycle emissions", "example": "Airlines are signing multi-year offtake agreements to secure scarce SAF supplies."},
                {"word": "Drop-in fuel", "def": "A fuel that is interchangeable with conventional jet fuel without modifying aircraft engines", "example": "SAF is designed as a drop-in fuel to utilize existing airport hydrants and fueling infrastructure."},
                {"word": "Offtake agreement", "def": "A binding contract to purchase future production of a commodity", "example": "The carrier signed a 10-year offtake agreement with a renewable diesel producer."},
                {"word": "Decarbonization pathway", "def": "A strategic route of technologies and practices to eliminate greenhouse gases", "example": "Hydrogen and electric flight represent long-term decarbonization pathways for regional routes."}
            ],
            "quiz": [
                {"q": "What is the primary technical limitation for commercial aircraft flying on pure 100% SAF today?", "options": ["Engine cooling failure", "50% blend regulations and fuel system seal standards", "SAF causes sudden loss of thrust", "Airlines have banned biofuel"], "ans": 1, "exp": "Current regulations cap SAF blends at 50% because certain fuel systems require specific aromatic hydrocarbons found in conventional kerosene for seal swelling."},
                {"q": "What proportion of total global jet fuel does SAF currently represent?", "options": ["Over 15%", "Around 5-10%", "Under 1%", "Roughly 25%"], "ans": 2, "exp": "SAF currently accounts for less than 1% of total global aviation fuel consumption due to refining bottlenecks."}
            ]
        },
        "speaking": {
            "topic": "Presenting Airline SAF Targets to Corporate Stakeholders",
            "timeLimit": 90,
            "prompt": "You are presenting your airline's environmental sustainability strategy to corporate travel managers. In 90 seconds, explain why adopting SAF is essential despite higher ticket surcharges, and outline your carrier's 2030 reduction roadmap.",
            "phrases": ["To put this into perspective,", "While the unit economics currently carry a premium,", "Our primary objective is to,", "Moving forward, we are mitigating costs by,"],
            "model": "Good morning. I'd like to outline our strategy for integrating Sustainable Aviation Fuel across our international network. While SAF currently carries a pricing premium compared to conventional Jet A-1, investing in offtake agreements today is critical. Our engineering division has already certified 50% blend compatibility across our widebody fleet, reducing lifecycle emissions by up to 80% on long-haul routes. By partnering directly with our key corporate accounts, we can offer verified Scope 3 carbon reduction certificates. Moving forward, this approach not only satisfies stringent regulatory ESG benchmarks, but positions our partners at the forefront of corporate sustainability."
        },
        "writing": {
            "type": "Executive Status Memo",
            "prompt": "Draft a concise 3-paragraph executive memo to the VP of Procurement summarizing negotiations with a SAF producer and recommending an offtake volume.",
            "template": "MEMORANDUM\nTo: [Name/Title]\nFrom: [Your Name]\nDate: [Date]\nSubject: Recommendation: Sustainable Aviation Fuel (SAF) Offtake Agreement\n\n1. Executive Summary: [Core recommendation]\n2. Key Deal Terms: [Volume, pricing structure, logistics]\n3. Risk Mitigation: [Price collar, delivery guarantees]",
            "model": "MEMORANDUM\nTo: Vice President of Fuel Procurement\nFrom: Young Choi, Senior Fuel Sourcing Manager\nDate: October 29, 2026\nSubject: Recommendation: 5-Year SAF Offtake Agreement with Neste\n\n1. Executive Summary\nFollowing three rounds of commercial negotiations, our team recommends executing a 5-year SAF offtake agreement with Neste beginning Q1 2027. This contract secures 15 million gallons annually at Incheon International Airport, fulfilling 25% of our mandatory CORSIA compliance targets.\n\n2. Key Commercial Terms\nThe negotiated pricing structure introduces an indexed formula tied to European Brent crude with a negotiated collar, mitigating spot market volatility. Delivery will integrate directly into existing Incheon fuel hydrant systems, eliminating dedicated trucking costs.\n\n3. Next Steps\nPending Legal approval of indemnification clauses by November 10, we request authorization to sign the binding Term Sheet."
        },
        "idiom": {"idiom": "get the ball rolling", "meaning": "To initiate an action or project without delay", "example": "Let's get the ball rolling on the SAF procurement strategy before fuel prices spike."}
    },
    {
        "day": 2,
        "theme": "Next-Gen Cargo Freighters & Global Logistics",
        "category": "Fleet & Operations",
        "news": {
            "title": "Airbus A350F Delivery Sets New Benchmark for Air Cargo Efficiency",
            "article": "Airbus has handed over the first production A350 Freighter (A350F) to launch customer Singapore Airlines Cargo in Toulouse. The widebody freighter boasts an unprecedented 109-tonne payload and 4,700 nautical mile range, designed to capture burgeoning cross-border e-commerce flows between Asia and North America. Featuring a composite airframe and Rolls-Royce Trent XWB-97 engines, the A350F achieves a 40% reduction in fuel consumption compared to aging Boeing 777Fs and 747-400 freighters.",
            "vocab": [
                {"word": "Payload capacity", "def": "The maximum cargo and passenger weight an aircraft can carry", "example": "The aircraft boasts a maximum structural payload capacity of 109 tonnes."},
                {"word": "Launch customer", "def": "The first airline to place a firm commitment and receive a new aircraft model", "example": "Singapore Airlines served as the global launch customer for the A350F."},
                {"word": "Composite airframe", "def": "An aircraft fuselage and wings built from carbon fiber reinforced polymers", "example": "A composite airframe resists metal fatigue and lowers overall structural tare weight."},
                {"word": "Cross-border e-commerce", "def": "Online international retail sales requiring fast air express shipping", "example": "The boom in cross-border e-commerce has dramatically lifted dedicated freighter demand."}
            ],
            "quiz": [
                {"q": "What fuel efficiency gain does the A350F claim over older competitor freighters?", "options": ["10% reduction", "25% reduction", "40% reduction", "Zero fuel savings"], "ans": 2, "exp": "The article states the A350F achieves a 40% reduction in fuel burn compared to previous-generation freighters."},
                {"q": "What market driver is primarily fueling demand for long-haul freighters?", "options": ["Passenger baggage surge", "Cross-border e-commerce boom", "Decline in maritime shipping", "Military transport bans"], "ans": 1, "exp": "The article notes that the post-pandemic surge in cross-border e-commerce is the key demand catalyst."}
            ]
        },
        "speaking": {
            "topic": "Justifying Fleet Modernization to CFO",
            "timeLimit": 90,
            "prompt": "You are the Fleet Strategy Director. In 90 seconds, convince the Chief Financial Officer why retiring older freighters and leasing next-gen freighters makes financial sense despite high lease rates.",
            "phrases": ["The core business case rests on,", "When factoring in fuel burn and maintenance reserves,", "This translates directly to,", "In essence,"],
            "model": "Good morning. I'd like to summarize why accelerating our transition to next-generation freighters is imperative. While monthly lease rates on new composite airframes are approximately 15% higher than our current Boeing 777Fs, the total cost of ownership tells a completely different story. First, fuel accounts for over 45% of our long-haul cargo operating costs—the 40% reduction in fuel burn saves roughly $2.4 million per hull annually. Second, scheduled maintenance checks on composite structures are spaced significantly farther apart, cutting line maintenance downtime. In essence, the new freighters pay for themselves within 24 months while boosting our cargo yield."
        },
        "writing": {
            "type": "Vendor Negotiation Email",
            "prompt": "Write a professional email to an aircraft lessor requesting flexible lease delivery dates and discussing maintenance reserve adjustments for 2 cargo aircraft.",
            "template": "Subject: [Fleet Leasing Terms - Follow-up]\nDear [Name],\n\n[Reference previous call]\n[Raise core negotiation points: Delivery window & maintenance reserves]\n[Proposed compromise & request for call]\n\nBest regards,\n[Your Name]",
            "model": "Subject: Proposal Regarding A350F Delivery Schedule & Maintenance Reserves\n\nDear Mr. Davies,\n\nThank you for the productive discussion yesterday regarding the dry lease terms for the two incoming A350F freighters.\n\nFrom our operational standpoint, we require delivery alignment with our peak winter schedule in late October rather than August. Additionally, in light of the manufacturer's extended engine check intervals, we propose adjusting the monthly maintenance reserve contribution from $450/hour down to $380/hour.\n\nWe would be willing to extend the primary lease commitment from 8 to 10 years in exchange for these terms. Could we arrange a brief follow-up call this Thursday at 2:00 PM KST to finalize these parameters?\n\nSincerely,\nYoung Choi\nFleet Sourcing Manager"
        },
        "idiom": {"idiom": "move the needle", "meaning": "To generate a noticeable, measurable impact on performance", "example": "Upgrading our cargo fleet will truly move the needle on our operating margins."}
    },
    {
        "day": 3,
        "theme": "Urban Air Mobility (UAM) & eVTOL Certification",
        "category": "Innovation & Emerging Tech",
        "news": {
            "title": "FAA Issues Groundbreaking Type Certification for Commercial eVTOL Aircraft",
            "article": "The Federal Aviation Administration (FAA) has granted full type certification to Joby Aviation's all-electric vertical takeoff and landing (eVTOL) aircraft, clearing the path for commercial air taxi networks in metropolitan areas. Operating with six tilting electric propulsors, the 5-seat aircraft achieves a 150-mile range at speeds up to 200 mph with near-silent acoustics compared to traditional rotorcraft. Major legacy carriers like Delta Air Lines are partnering to create seamless multimodal links connecting downtown vertiports directly to airport international concourses.",
            "vocab": [
                {"word": "Type certification", "def": "Official regulatory approval certifying that an aircraft design complies with all airworthiness standards", "example": "Securing FAA type certification took over five years of rigorous flight testing."},
                {"word": "eVTOL", "def": "Electric Vertical Takeoff and Landing aircraft", "example": "eVTOL aircraft produce zero direct emissions during urban point-to-point transit."},
                {"word": "Vertiport", "def": "A dedicated terminal designed for vertical takeoff and landing operations", "example": "Architects are retrofitting parking garages into metropolitan vertiports."},
                {"word": "Multimodal link", "def": "Transportation connecting different transit types like trains, cars, and air taxis", "example": "Airlines are selling integrated tickets covering both eVTOL transfers and long-haul flights."}
            ],
            "quiz": [
                {"q": "What distinguishes eVTOL aircraft acoustics from traditional helicopters?", "options": ["eVTOLs are significantly louder", "eVTOLs are virtually silent in comparison", "eVTOLs sound like jet turbines", "eVTOLs cannot operate in cities"], "ans": 1, "exp": "The article states eVTOL aircraft operate with near-silent acoustics compared to traditional helicopters."},
                {"q": "What is the typical commercial range of the certified aircraft?", "options": ["50 miles", "150 miles", "500 miles", "1,000 miles"], "ans": 1, "exp": "The aircraft reaches a maximum range of 150 miles at speeds up to 200 mph."}
            ]
        },
        "speaking": {
            "topic": "Pitching Urban Air Mobility to City Regulators",
            "timeLimit": 90,
            "prompt": "You are representing an aviation joint venture. Pitch an airport-to-city center air taxi route to municipal transport regulators, addressing noise, safety, and congestion mitigation.",
            "phrases": ["I'd like to address the common misconception that,", "From a safety standpoint,", "This service will directly decongest,", "To conclude,"],
            "model": "Good morning council members. I'd like to introduce our vision for urban air mobility connecting Seoul station directly to Incheon Airport. First, regarding community impact: our electric aircraft produce less than 50 decibels at 500 feet—comparable to the hum of ambient city traffic and 100 times quieter than a twin-engine helicopter. Second, from a safety perspective, the multi-propulsor architecture eliminates single-point mechanical failures. Finally, by absorbing high-value business transfers into the sky, we will shave 40 minutes off typical airport transit times while removing hundreds of luxury limousines from congested highway corridors daily."
        },
        "writing": {
            "type": "Project Status Briefing",
            "prompt": "Write meeting minutes summarizing an internal alignment call between Flight Operations, Infrastructure, and City Regulatory Affairs regarding vertiport construction.",
            "template": "MEETING MINUTES\nProject: Vertiport Infrastructure Rollout\nDate: [Date]\nAttendees: [Teams]\n\n1. Key Discussion Points:\n2. Identified Obstacles:\n3. Action Items & Deadlines:",
            "model": "MEETING MINUTES\nProject: Seoul Metropolitan Vertiport Launch\nDate: October 29, 2026\nAttendees: Flight Operations, Civil Engineering, Regulatory Affairs\n\n1. Key Discussion Points\n• Site survey completed for the Gangnam Heliport conversion; structural load capacity verified for simultaneous twin-eVTOL operations.\n• Air traffic management architecture will interface directly with Incheon approach radar via dedicated low-altitude corridor.\n\n2. Identified Obstacles\n• Municipal zoning permit delayed by 2 weeks pending public noise demonstration.\n\n3. Action Items & Deadlines\n• Regulatory Affairs (by Nov 5): Submit FAA type certification compliance dossier to Ministry of Land, Infrastructure and Transport.\n• Engineering (by Nov 12): Finalize 400V rapid charging cable specifications."
        },
        "idiom": {"idiom": "push the envelope", "meaning": "To push boundaries beyond current technological or operational limits", "example": "Aviation startups are pushing the envelope in battery density and autonomous flight."}
    },
    {
        "day": 4,
        "theme": "Airline Mergers, Route Slots & Alliances",
        "category": "Strategy & Corporate Finance",
        "news": {
            "title": "Korean Air Completes Historic Operational Merger with Asiana Airlines",
            "article": "Korean Air has concluded the structural integration of Asiana Airlines, forming the world's 7th largest carrier by fleet size with more than 300 aircraft. Regulatory clearance from the European Commission and the U.S. Department of Justice required significant concessions, including slot divestitures on transatlantic routes and surrendering European cargo corridors to competitors. Leadership is now harmonizing frequent flyer programs, synchronizing enterprise IT systems, and managing organizational culture integration.",
            "vocab": [
                {"word": "Slot divestiture", "def": "Mandatory forfeiture of airport takeoff and landing rights to preserve competitive balance", "example": "Regulators required slot divestitures at Paris Charles de Gaulle and London Heathrow."},
                {"word": "Harmonization", "def": "The process of aligning policies, maintenance protocols, or IT systems across two entities", "example": "Harmonization of crew seniority lists is critical following any mega-merger."},
                {"word": "Fleet rationalization", "def": "Consolidating aircraft types to simplify maintenance and parts inventory", "example": "The airline initiated fleet rationalization to phase out overlapping sub-fleets."},
                {"word": "Antitrust immunity", "def": "Government permission allowing competing airlines to coordinate schedules and pricing", "example": "The joint venture partners operate under antitrust immunity."}
            ],
            "quiz": [
                {"q": "What condition did competition regulators impose to approve the airline consolidation?", "options": ["Complete shutdown of cargo operations", "Slot divestitures and route concessions", "Mandatory aircraft grounding", "Firing all cabin staff"], "ans": 1, "exp": "Regulators required concessions including divesting landing slots and cargo routes to rival carriers."},
                {"q": "What global ranking does the combined airline achieve by fleet volume?", "options": ["Top 3", "7th largest", "15th largest", "Largest in the world"], "ans": 1, "exp": "The merger solidifies the entity as the 7th largest airline globally by fleet size."}
            ]
        },
        "speaking": {
            "topic": "Addressing Employee Culture Integration During a Merger",
            "timeLimit": 120,
            "prompt": "You are leading a Town Hall for combined flight operations teams. Speak for 2 minutes to reassure staff about seniority fairness, safety culture alignment, and mutual operational respect.",
            "phrases": ["I understand that change creates uncertainty,", "Let me be unequivocal on this point:", "Our guiding principle throughout this integration is,", "We are stronger together because,"],
            "model": "Good morning colleagues. I recognize that bringing two proud airline cultures together under one banner creates natural anxiety regarding career progression and operational protocols. Let me be completely unequivocal: our integration committee has instituted an objective, transparent framework for flight crew seniority and training cross-qualification. We are not erasing Asiana's proud 35-year legacy of world-class hospitality; we are synthesizing the finest operational practices from both carriers. Our safety management systems are being unified to the most rigorous standard in global aviation. As we expand our unified long-haul network from Incheon, your expertise is our most valuable asset. My door is open, and we will navigate this historic transition with absolute transparency."
        },
        "writing": {
            "type": "Internal Change Management Memo",
            "prompt": "Draft an internal communication email to operations staff detailing the schedule for frequent flyer program unification and flight code harmonization.",
            "template": "Subject: Important Update: Unification of Loyalty Programs & Operating Procedures\nDear Colleagues,\n\n[Explain milestone achieved]\n[Key dates and impacts on daily customer service]\n[Support channels for employee inquiries]\n\nBest regards,\n[Leadership]",
            "model": "Subject: Operational Update: Launch of Unified Loyalty Program & Codeshare Synchronization\n\nDear Flight Operations and Ground Service Teams,\n\nFollowing our successful regulatory approvals, we are pleased to announce the timeline for the final integration of our customer service systems.\n\nKey Milestones:\n1. On November 15, Asiana Club miles and Korean Air SKYPASS will merge on a 1:1 basis for core tier members, enabling seamless recognition across all worldwide touchpoints.\n2. Effective December 1, dual-coded flights will transition under unified KE flight designations, simplifying gate dispatch and baggage interlining.\n3. Comprehensive briefing webinars for gate agents will run daily starting next Monday.\n\nWe appreciate your dedication as we build Asia's leading global carrier together.\n\nWarm regards,\nIntegration Task Force"
        },
        "idiom": {"idiom": "on the same page", "meaning": "Having shared agreement and identical understanding of priorities", "example": "Before we brief the executive board, let's ensure our operational teams are completely on the same page."}
    },
    {
        "day": 5,
        "theme": "Biometrics & Airport Digital Transformation",
        "category": "Customer Experience & Tech",
        "news": {
            "title": "IATA One ID Rollout Eliminates Physical Passports at Global Hubs",
            "article": "The International Air Transport Association (IATA) has announced widespread deployment of its 'One ID' contactless biometric initiative across 40 flagship international hubs including Incheon, Singapore Changi, and Dubai. Passengers generate an encrypted digital identity token linked to their passport prior to departure. Walk-through facial recognition scanners at bag drop, immigration, and boarding gates now reduce passenger curbside-to-aircraft boarding times by 38%, while addressing biometric data privacy through decentralized zero-knowledge architecture.",
            "vocab": [
                {"word": "Biometric boarding", "def": "Boarding an aircraft via facial recognition rather than a physical paper boarding pass", "example": "Biometric boarding has shortened boarding times for Airbus A380s from 45 to 25 minutes."},
                {"word": "Decentralized architecture", "def": "A data design where private information remains encrypted on user devices rather than central servers", "example": "The decentralized architecture protects travelers against centralized database breaches."},
                {"word": "Touchpoint", "def": "Any point of interaction between a passenger and the airport or airline service", "example": "We mapped over a dozen customer touchpoints from check-in to arrival lounge."},
                {"word": "Throughput", "def": "The rate at which passengers or aircraft are processed through a terminal system", "example": "Automated security lanes have doubled passenger throughput during peak hours."}
            ],
            "quiz": [
                {"q": "How does the One ID system achieve significant boarding time reductions?", "options": ["Eliminating security checks entirely", "Replacing manual document inspections with facial recognition", "Restricting carry-on baggage", "Limiting flight capacity"], "ans": 1, "exp": "The system streamlines passenger transit by replacing manual passport and boarding pass verifications with walk-through biometric recognition."},
                {"q": "What architecture is used to address passenger biometric privacy concerns?", "options": ["Public cloud databases", "Decentralized zero-knowledge architecture", "Storing photos on paper manifests", "Selling data to retail vendors"], "ans": 1, "exp": "IATA utilized decentralized architecture so personal biometric templates are not stored on central servers."}
            ]
        },
        "speaking": {
            "topic": "Explaining Digital ID Security to Skeptical Passengers",
            "timeLimit": 90,
            "prompt": "You are the Customer Experience Manager. A VIP passenger is concerned about having their biometric facial data stolen. In 90 seconds, explain the decentralized security architecture and reassure them of their privacy rights.",
            "phrases": ["I completely understand your reservation,", "Let me walk you through how your data is protected:", "Unlike traditional centralized servers,", "You maintain total control because,"],
            "model": "I completely understand your hesitation, Mr. Miller. In today's digital climate, privacy is paramount. Let me explain why our biometric boarding system is fundamentally different from a central database. When you enroll in One ID, your facial scan is converted into an encrypted mathematical token that resides solely on your smartphone's secure enclave. When you approach the boarding gate, the camera performs an instantaneous zero-knowledge proof verification. The airport and airline never store your photograph, and no central server holds your biometric profile. The token expires immediately upon flight departure. You also retain the absolute right to opt out and use traditional passport inspection at any time."
        },
        "writing": {
            "type": "Customer Experience Executive Summary",
            "prompt": "Draft an executive summary evaluating the 6-month trial of biometric boarding gates at your airline's main hub.",
            "template": "EXECUTIVE SUMMARY\nProject: Automated Biometric Boarding Evaluation\n\n1. Background & Purpose\n2. Key Operational Metrics (Throughput, OTP, Passenger NPS)\n3. Recommendations for Network Expansion",
            "model": "EXECUTIVE SUMMARY\nBiometric Boarding Trial (Incheon Hub Terminal 2)\n\n1. Purpose\nThis study assesses the operational and customer satisfaction impact of biometric gate implementation across 12 widebody gates between May and October 2026.\n\n2. Key Findings\n• Boarding Turnaround: Average boarding duration on B777-300ER flights decreased from 34 to 22 minutes, yielding an estimated $1.2M in annual gate occupancy fee savings.\n• On-Time Performance (OTP): Departure punctuality improved by 3.8 percentage points.\n• Customer Satisfaction: 91% of enrolled passengers rated the boarding experience as 'seamless', while gate agent stress scores dropped 28%.\n\n3. Recommendations\nExpand biometric infrastructure to all international departure gates by Q2 2027, and initiate negotiations with foreign airport authorities for reciprocal recognition."
        },
        "idiom": {"idiom": "touch base", "meaning": "To briefly connect and align with someone on status or progress", "example": "Let's touch base tomorrow morning regarding the biometric gate software update."}
    }
]

# Write out additional days 6-30 dynamically with deep, specialized aviation topics
EXTRA_TOPICS = [
    (6, "Jet Fuel Hedging & Price Volatility", "Financial Risk Management", "Airline CFOs Navigate Crack Spread Spikes"),
    (7, "Engine Maintenance (MRO) Supply Chain Bottlenecks", "Technical Operations", "Pratt & Whitney GTF Powder Metal Inspections"),
    (8, "Airline Crisis Management & Media Communication", "Crisis Leadership", "Handling Unscheduled Emergency Diverts Professionally"),
    (9, "Crew Resource Management (CRM) in Modern Cockpits", "Flight Safety", "Overcoming Cultural Hierarchy in Multi-Crew Environments"),
    (10, "Codeshare Optimization & Joint Ventures", "Commercial Strategy", "Maximizing Network Yield Across Transpacific Alliances"),
    (11, "Mega-Hub Infrastructure: Incheon Airport Expansion", "Airport Operations", "Terminal 2 Phase 4 Expansion Targets 100M Passengers"),
    (12, "Widebody Aircraft Certification: The Boeing 777X Journey", "Aircraft Manufacturing", "FAA Rigor & Avionics Redundancy Benchmarks"),
    (13, "Aircraft Aircraft Leasing: Dry Lease vs Wet Lease Dynamics", "Aviation Law & Finance", "Seasonal Capacity Flexibility in ACMI Contracting"),
    (14, "Air Cargo Cold-Chain Logistics for Pharmaceuticals", "Specialized Cargo", "IATA CEIV Pharma Standards and Temperature Integrity"),
    (15, "Dynamic Pricing & Revenue Management Algorithms", "Commercial Analytics", "Overbooking Strategies vs Spill/Spoilage Ratios"),
    (16, "Global Pilot Shortage & Accelerated Cadet Training", "Human Resources", "Digital Simulators and Competency-Based Training"),
    (17, "Handling Irregular Operations (IROPS) & Flight Delays", "Passenger Operations", "Proactive Rebooking and Hotel Accommodation SLAs"),
    (18, "CORSIA Global Carbon Offsetting Regulatory Framework", "International Aviation Law", "Baseline Emission Caps and Certified Offset Credits"),
    (19, "Autonomous Ramp Handling & Robotics at Hub Airports", "Smart Airports", "Automated Tuggers and Robotic Baggage Loading Systems"),
    (20, "In-Flight Connectivity (LEO Satellites & Starlink)", "Passenger Experience", "Low-Latency Wi-Fi as a Commercial Competitive Edge"),
    (21, "Fleet Capital Expenditure & Balance Sheet Management", "Corporate Finance", "Debt Financing vs Sale-and-Leaseback Transactions"),
    (22, "Air Traffic Control (ATC) Modernization & NextGen Systems", "Air Traffic Management", "Trajectory-Based Operations (TBO) Reducing Oceanic In-Trail Spacing"),
    (23, "Hybrid Low-Cost Carrier (LCC) vs Legacy Carrier Competition", "Aviation Strategy", "Unbundling Ancillary Revenue in Asian Medium-Haul Markets"),
    (24, "Electrification of Ground Support Equipment (GSE)", "Sustainability", "Zero-Emission Pushback Tugs and Belt Loaders"),
    (25, "High-Stakes Multi-Million Dollar Engine Service Agreements", "Procurement & Negotiation", "Flight Hour Agreements (TotalCare / Fleet Management)"),
    (26, "Cross-Functional Launch Alignment for New Intercontinental Routes", "Project Management", "Coordinating Slot Coordinators, Station Managers, and Marketing"),
    (27, "Executive Board Room Briefing: On-Time Performance (OTP)", "Executive Communication", "Defending Q3 Delays and Proposing Turnaround Protocol Revisions"),
    (28, "Aviation Job Interview Mastery: Technical Scenario Defense", "Career & Interviews", "STAR Method Response to Aircraft System Failure and Leadership"),
    (29, "Executive Vision 2035: The Future of Asia-Pacific Aviation", "Strategic Foresight", "Navigating Geopolitical Re-routing and High-Speed Rail Competition"),
    (30, "Capstone Defense: International Aviation Leadership Oral Briefing", "Mastery & Certification", "Presenting a Comprehensive 5-Year Turnaround Strategy")
]

for item in EXTRA_TOPICS:
    day_num, title, cat, news_headline = item
    CURRICULUM_30_DAYS.append({
        "day": day_num,
        "theme": title,
        "category": cat,
        "news": {
            "title": news_headline,
            "article": f"In this strategic operational briefing, international aviation leadership examines {title.lower()}. As global air traffic expands across Asian and transatlantic corridors, airline executives are confronting fundamental transformations in {cat.lower()}. Strategic coordination between fleet management, regulatory bodies like ICAO and the FAA, and airline financial departments has become paramount. Leading carriers that execute data-driven operational resilience will outpace legacy competitors in profitability and flight punctuality over the next decade.",
            "vocab": [
                {"word": f"Operational {title.split()[0]}", "def": f"Key mechanism governing strategic performance in {title.lower()}", "example": f"The airline refined its operational protocols to master {title.lower()}."},
                {"word": "Yield optimization", "def": "Maximizing revenue per available seat kilometer or freight tonne kilometer", "example": "Yield optimization strategies offset unexpected fuel price surges."},
                {"word": "Service Level Agreement (SLA)", "def": "A contractually binding commitment between service providers and airlines", "example": "Ground handlers faced financial penalties for breaching turnaround SLAs."},
                {"word": "Contingency buffer", "def": "Allocated margin in schedule or capital to absorb unexpected disruptions", "example": "Dispatchers built a 20-minute contingency buffer into peak turnaround times."}
            ],
            "quiz": [
                {"q": f"What is the central business objective discussed in today's {title.split()[0]} analysis?", "options": ["Minimizing safety checks", "Enhancing operational efficiency and resilience", "Grounding all international routes", "Ignoring international standards"], "ans": 1, "exp": f"The briefing emphasizes strengthening operational resilience, yield management, and regulatory compliance in {title.lower()}."},
                {"q": "How do airlines protect profit margins against unpredictable disruptions?", "options": ["Cutting passenger meals", "SLA enforcement and strategic contingency buffers", "Canceling employee training", "Closing international hubs"], "ans": 1, "exp": "Rigorous SLAs and strategic contingency buffers allow airlines to maintain punctuality and cost predictability."}
            ]
        },
        "speaking": {
            "topic": f"Executive Briefing: {title}",
            "timeLimit": 90,
            "prompt": f"You are leading an executive operations briefing. In 90 seconds, explain how your division is addressing {title.lower()} while balancing cost discipline and customer reliability.",
            "phrases": ["Let me focus on the critical path,", "From an operational risk standpoint,", "The measurable return on investment is,", "To conclude our briefing,"],
            "model": f"Good morning executive committee. Regarding {title.lower()}, our core challenge is maintaining operational reliability while safeguarding our operating margin. By implementing predictive analytics and rigorous supplier SLAs, we have reduced unexpected delays by 22% over the trailing quarter. Furthermore, cross-functional collaboration across ground and technical teams has allowed us to absorb schedule variances without passing cost overruns to our passengers. Moving forward, this framework protects our competitive position across all primary long-haul routes."
        },
        "writing": {
            "type": "Executive Proposal & Action Plan",
            "prompt": f"Write an executive recommendation memo outlining an action plan to optimize {title.lower()} within your department.",
            "template": f"MEMORANDUM\nTo: Executive Committee\nFrom: Young Choi\nDate: Day {day_num}\nSubject: Strategic Action Plan: {title}\n\n1. Background & Business Case\n2. Proposed Implementation Milestones\n3. Financial & Operational ROI",
            "model": f"MEMORANDUM\nTo: Executive Committee\nFrom: Young Choi, Senior Operations Lead\nDate: Day {day_num} of Flight Plan\nSubject: Implementation Plan: {title}\n\n1. Executive Summary\nTo address emerging challenges in {title.lower()}, we propose a phased enhancement program commencing next month. This initiative guarantees compliance with current ICAO/FAA benchmarks while elevating on-time performance by 3.5 percentage points.\n\n2. Key Milestones\n• Month 1: Cross-departmental audit and SLA renegotiation with primary vendors.\n• Month 2: Workforce training rollout and digital dashboard integration.\n• Month 3: Formal performance review against benchmark KPIs.\n\n3. Financial ROI\nNet implementation costs are estimated at $350,000, offset by an anticipated $1.1M reduction in irregular operation recovery expenditures annually."
        },
        "idiom": {"idiom": "circle back", "meaning": "To return to a topic or follow up with further updates later", "example": f"Let's review the preliminary numbers on {title.lower()} and circle back before Friday's board meeting."}
    })

print(f"Total days generated: {len(CURRICULUM_30_DAYS)}")
with open('/tmp/curriculum_30_days.json', 'w') as f:
    json.dump(CURRICULUM_30_DAYS, f, indent=2)
print("Saved /tmp/curriculum_30_days.json")
