import { OpenAI } from 'openai';
import type { Hook, Tone } from '../types/hooks';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// 1,255 proven viral hooks database extracted from CSV
const PROVEN_TEMPLATES = [
  "Here's exactly how to [outcome]. [solution].",
  "Here's exactly how you're gonna [outcome].",
  "Here's the exact 3 step process to [outcome].",
  "Here's exactly how to NEVER [opposite of outcome].",
  "Here's the only [solution] that will let you [personal outcome].",
  "Here's the only method/way/strategy/hack that will let you [personal outcome].",
  "Here's the only guide to [solution] you will ever need.",
  "Here's how to never [opposite of solution] for the rest of your life.",
  "Alright if I was you and I needed to [outcome] really quickly, I'm gonna tell you exactly what I would do. Free sauce.",
  "You ever see videos on Youtube of [outcome], and you're like how the hell is that even possible?",
  "Everybody that tells you that you don't need to [solution] to [outcome] is lying to you.",
  "If there's one piece of advice about how to [outcome] today, please let it be this.",
  "If you wanna [outcome] in 3 months time, here's your 5 step checklist for you to do right now, if you just do this I promise you'll [outcome]. Step 1…",
  "A lot of people who wanna [outcome] fail to do so because they're not [solution].",
  "Wanna know why most people never [outcome]?",
  "Here's how to stop [opposite of outcome]. [Solution].",
  "If I was young again and I had to [personal outcome] all over again, this is exactly how I'd do it.",
  "I'm gonna show you exactly how to [outcome] in a very very specific way.",
  "Alright I'm gonna teach you exactly how to [outcome] in one video.",
  "Here's the story of how I accidentally [personal outcome].",
  "You ever see people who just have [outcome], and you kinda wonder like, what it is that makes them so special?",
  "You ever see people who seem to [outcome] SO easily, and you kinda wonder like, what it is that makes them so special?",
  "In 60 seconds I'm going to logically prove to you how you can literally [outcome].",
  "Here's why you should [solution].",
  "Here's how to [outcome]. Stop [solution, if about quitting something].",
  "Here's how to [outcome]. [Solution].",
  "Here's the ONE [solution] I used to [outcome]. Like I [personal outcome] literally just spamming this ONE [solution].",
  "Here's how to [outcome]. The solution that's always worked for me is [solution].",
  "Here's how to stop [opposite of outcome]. Stop [solution, if about quitting something].",
  "Today, we're gonna be talking about how to [outcome].",
  "Alright this is the single easiest way to [outcome].",
  "If you want to instantly [outcome], this is the ONLY video you will ever need to watch.",
  "Here's exactly how you're gonna [outcome] in 2024. You're gonna [solution].",
  "Here's the only video you will ever need to watch to [outcome].",
  "Here's the strategy I used to [outcome]. I used a strategy I like to call [solution].",
  "The easiest way to [outcome] is to [solution].",
  "Here's exactly how you're gonna [outcome] in 2024. You're gonna [solution].",
  "The way to instantly [outcome] is to simply [solution].",
  "If there's one thing you can do to [outcome] that actually takes ZERO work, it's this.",
  "If you're tired of [opposite of outcome], here's the ultimate guide to [outcome]. Take notes and thank me later.",
  "If you're tired of never [outcome], you NEED to watch this video.",
  "I'm gonna give you guys my BEST [solution] as someone who [personal outcome] that's literally gonna help you [outcome].",
  "So I heard you wanna [outcome]. This is the SIMPLEST and BEST way to [outcome], coming from a guy whose [personal outcome].",
  "Here's exactly how you're gonna [verb] your first [outcome].",
  "I get this question SO often. How did you [personal outcome]? And I Iiterally just [solution].",
  "Here's some unethical life hacks to [outcome] that you definitely shouldn't use.",
  "Here's exactly how you're gonna [outcome] in the next 60 seconds.",
  "Here's exactly how I [personal outcome]. I [solution].",
  "I [personal outcome], and I just wanna break down the exact [solution] I used to get such crazy results.",
  "I recently [personal outcome], and I just wanna break down the exact [solution] I used to get such crazy results.",
  "So you failed to [personal outcome]. Tough love, but it's because you didn't [solution].",
  "Here's how to ACTUALLY [outcome]. [Solution].",
  "Here's how to NOT [opposite of outcome]. Stop [opposite of solution]",
  "It is officially the easiest time to [outcome], and I'm gonna give yall all the sauce on how you're gonna [outcome] in the next week.",
  "In 60 seconds, I'll show you how to [outcome].",
  "I'm gonna show you exactly how to become a [outcome] in one video.",
  "I'm gonna show you exactly how to get over your [outcome] in one video.",
  "It took me 4 years to learn what I'm about to teach you in a minute and a half.",
  "This is how to [outcome]. What you're gonna need is a [solution]. What is a [solution]?",
  "Every day I [personal outcome], and here are my 8 tips to [personal outcome].",
  "After years of [personal outcome], these are the 6 rules of [outcome] I know to be true.",
  "After years of research, I've developed the greatest routine to [outcome]. Here are the 7 steps you should take every day.",
  "I just completed [personal outcome]. Here's why I haven't stopped.",
  "3 steps for becoming [outcome].",
  "5 principles for becoming [outcome].",
  "3 things I wish I knew in my early 20s. [solution].",
  "4 ways to [outcome].",
  "5 things you need to know if you want to [outcome].",
  "This goes out to all my homies who struggle with [outcome].",
  "Here's a life hack that's gonna [outcome] that they never taught you in school.",
  "Here's how to [outcome] in a way a 5 year-old could understand.",
  "This is exactly how to [outcome] in a way a 5 year-old could understand.",
  "You wanna [outcome] in 2024, I recommend listening to this video all the way through because the trends/methods/strategies/tricks that have worked for [outcome] in the past aren't anymore, but the new trend/method/strategy/trick you need to use is…",
  "I was just [personal story] and I just got the best advice on [outcome] that I've ever heard.",
  "This is the ultimate guide on how to [outcome].",
  "Does [solution] ACTUALLY get you [outcome]?",
  "You guys ever heard of the [solution]? Cus the [solution] is life-changing.",
  "One of the things I really like to do if I wanna [outcome] but I don't know how is the [solution] method.",
  "Alright if you want one of your average [noun from the outcome] to look like this, the best thing you can do is [solution].",
  "Here's how to [outcome] literally anywhere.",
  "If I needed to [dream outcome] or someone was gonna blow my brains out, this is what I would do.",
  "Your [thing/situation]s will feel way less [outcome] when you understand these 3 things.",
  "Here are 3 rules you should follow if you actually wanna [dream outcome].",
  "Here are 3 reasons why you're gonna [dream outcome].",
  "In 60 seconds I'm gonna logically prove to you how you can [dream outcome].",
  "There are 3 reasons you're [problem] right now. Either one, you [negative habit/action]…",
  "Having [dream outcome] is pretty fucking cool. So if you wanna [dream outcome], here are 3 ways you can actually do that. Number one…[habit/action].",
  "So I just [personal dream outcome] yesterday, and I wanted to tell yall some lessons I've learned along the way to teach you what I wish I knew now.",
  "So I just [personal dream outcome] last week/month/year, and here are 3 lessons I've learned along the way.",
  "Here are 3 [niche] hacks guaranteed to turn you into a [dream outcome].",
  "If I could teleport back to before I [personal dream outcome], here are the 3 things that I would sell my kidney today to tell past me.",
  "Here are the 3 easiest ways to [dream outcome].",
  "The 3 [thing/action/habit]s you need to [dream outcome].",
  "Here are 3 ways to actually [dream outcome]. If you don't implement some sort of system to [same dream outcome], you're gonna have [problem].",
  "These are 3 [thing/situation] tips that you fuckin' need. Lock in, implement them, and [dream outcome].",
  "3 signs you're probably the [trait] homie.",
  "I'm not sure if you guys know this or not, but right now people are boycotting [thing].",
  "If you're a guy and there's this [dream outcome], or you're a girl and there's this [female variation of dream outcome], I'mma give you 3 ways to [dream outcome].",
  "Here's what (group) don't want you to know about (thing)",
  "Here are the top 5 (thing avatar wants) for (avatar)",
  "Here's how to get (thing avatar wants) literally anywhere",
  "3 (resource type) that will save you from ebola as a (avatar) in 2023",
  "The secret to (thing they want) is (intriguing phrasing of simple concept)",
  "How to ACTUALLY (achieve thing they want)",
  "How to get (thing avatar wants) - with green screen and you showing a guide",
  "The goated (way to do thing that is important to them)",
  "The most important decision you have to make as a (avatar) is ()",
  "Underrated (avatar) hack",
  "I'm literally gonna solve all your (section of their life) problems in one video",
  "17 ways to not be (thing they dont want to be)",
  "Here's the TRUTH about (thing they will experience)",
  "Here's how to do XYZ like the rich",
  "(Thing they experience) 101",
  "Here are 3 strange (topic) hacks guaranteed to turn you into a (term for someone really good at that topic)",
  "You wanna know what the (most adjective they want) mf's in (their age group/demographic) have in common?",
  "I don't think people understand how fucked up it is that we let people (do X thing)",
  "The biggest problem with the (XX system) that nobody talks about is (bold claim)",
  "Here are the 3 best (things related to your niche) for the year 2030",
  "Let's get you (thing they want) papi/bro/homie.",
  "Here's the no-fail system to getting (thing they want) your (roasting their normal source of information) didn't teach you",
  "If you want to win at (thing they experience) you need (thing that sounds counterintuitive)",
  "The WORST (thing they do/choose) in 2024 is…",
  "Here are 3 signs you picked the wrong (thing in your niche)",
  "If you're having trouble {thing they need to do}, watch this video, I'm gonna change your life. It might not change your life, but I'm gonna help you {dream outcome}.",
  "If you're not getting [dream outcome] in [situation/time], it's probably because you don't know the [solution name] framework.",
  "There's only 3 ways you can compete as a [title/identity/dream persona].",
  "If you're a {title} and you wanna crush it in {thing}, you need to watch this video, lock the f*ck in, because no one's gonna give you the sauce. I'm gonna give you the complete roadmap to kill it in [thing]. It's gonna help you [dream outcome examples].",
  "Here are the 3 biggest \"no-nos\" when it comes to (your niche)",
  "It's (today's date) and it's not too late for you to (achieve thing they want)",
  "This is gonna sound like pedantic advice, it's gonna sound so obvious like ohhh shut the f*ck up! But if you're crazy [nightmare problem situation] in [situation/place/time], you're in one of those days where [example], you can take a breath and remind yourself that [solution/opinion].",
  "This is gonna sound like repetitive advice, it's gonna sound so obvious like ohhh shut the f*ck up! But if you're crazy [nightmare problem situation] in [situation/place/time], you're in one of those days where [example], take a breath and remember the [solution name].",
  "If you're down f*cking sad in {niche/position/situation/thing/pursuit}, you need to start {solution}.",
  "Here are 4 fascinating facts about {thing they're interested in}.",
  "If you're a [position/title], this is the EASIEST way to wake up with a [dream outcome].",
  "When things click they click for (your IVP).",
  "(reassuring the viewer video) If you're a [title], there is nothing wrong with you if you are struggling in [thing/place/situation/title]. Like it's okay if you're [example 1], it's okay if you're [example 2].",
  "If you're in [thing/place/time/position] and your [thing they care about] is all f*cked up and you're worried about [dream outcome], the NUMBER ONE thing you can do is go [solution].",
  "You need to hear this if you're obsessed with (thing)",
  "I don't think I could say this with any more conviction, but [thing a lot of people like] is so f*cking dumb.",
  "So if you're in [place/time/situation], and you feel like you [nightmare problem situation description with examples], watch this video and it'll change your life.",
  "One of the best things you can do for your [thing they need to do] in [time/situation/place] is literally just [one-word solution].",
  "There are many times in [thing] where you take a massive f*cking L, and the only thing you can do is [solution].",
  "These are the 3 hallmarks of a goated (thing they need to do)",
  "Here are the 3 signs of a goated (thing they need to do).",
  "Here are 3 {thing in your niche} tips that you f*cking need.",
  "There's only 2 kinds of people who get (dream outcome)s, one of whom is the most miserable, sad, upset people on earth, and the other one is the [dream outcome/persona], who you should try to be like.",
  "This is what nobody seems to understand about [thing].",
  "Ultimate [thing] hack for men is being able to [action], but [twist to solution]. You have to understand, [opinion].",
  "When you actually [major event/accomplishment], there's only 2 things you can do to [dream outcome].",
  "When you actually graduate college/highschool, there's only 2 things you can really do to [dream outcome].",
  "In [place/time/age], there are a couple defining moments. There are gonna be times where [example 1], and there's gonna be times where [example 2]. These 3 things are where all the [event/thing] comes out.",
  "The number one decision you can make (in a situation your IVP finds themselves in)",
  "(Category of celebrity / pop culture thing) as (things in your niche) part 1",
  "If you're a (IVP), you need to get (thing that sounds awful)",
  "Whenever I get to a [bad situation], where I think, why do I even bother, I just try to remind myself: [insert quote].",
  "Stop [habit/action] if you actually want to become successful.",
  "Here's 3 reasons why you need to [habit/action] in 2024.",
  "Everybody that tells you you need to [opposite of solution, or negative habit/action] is lying to you.",
  "If you want to ACTUALLY [outcome] in 2024, you need to [solution].",
  "This is how I went from [personal outcome before] to [dream personal outcome] in _ years/months/days.",
  "Use specific numbers and dates",
  "You don't understand the 4 phases of [outcome].",
  "All [niche] advice absolutely sucks. This is the only good piece of [niche] advice I've ever gotten, and it's the most useful by far.",
  "A lot of people who want to [outcome] fail to do so because…",
  "You know what the problem is with this generation bro? None of you are [trait/solution] enough.",
  "This is kinda fucked up, but I feel like [opinion].",
  "A lot of people think you have to [limiting belief] to be [outcome]. I [personal outcome].",
  "Everybody that tells you you have to [action] to [outcome] is lying to you. I am one of the [adjective version of the action]est people I know, and the reason why I've [personal outcome] is because I simply [solution].",
  "Alright so if you're young and you [problem], let me tell you a lil secret. This is coming from someone who also [problem] like 3 years ago, and now I [personal dream outcome].",
  "I recently [personal dream outcome], and it's really not that great.",
  "Alright there's this myth going around that [dream outcome] does not change your life whatsoever, and that [expand upon myth], and that is WRONG. I currently [personal dream outcome], and I will tell you what it's actually like.",
  "If you're under 25 and you feel like you [problem], please just watch this video.",
  "The reason you [problem] is because you're trying to [limiting habit/action]",
  "If you pause and genuinely [solution], you will never struggle with [negative outcome] again.",
  "The way to instantly make your [situation/thing] way more [outcome] and way easier than it is right now is to simply understand that [opinion/idea].",
  "The way to instantly make your [situation/thing] way easier than it is right now is to simply understand that [opinion/idea].",
  "Take a second to pause and ask yourself, how would I live my life if I [solution]?",
  "If there's one thing you can do to [outcome] in your early 20's that actually takes 0 work, it's this.",
  "I think a reason why a lot of men/women are [negative outcome] is because they [limiting action].",
  "The reason why most men are [negative outcome] is because they think that [limiting action] will get them [outcome].",
  "It took me about _ years to realize that [opinion].",
  "Your [problem] will go away once you realize that [opinion].",
  "The biggest sign of [dream outcome] is [solution].",
  "Your [thing/situation]s will never be [problem] and you'll [dream outcome] once you're comfortable with [solution].",
  "Your [thing/situation]s will never be [problem] once you start [solution].",
  "Yo if you're in college/highschool right now and you wanna [dream outcome] and you don't wanna be [problem], watch this video.",
  "If you just [situation/thing], these next 6 to 12 months will set you up for the rest of your life. So if you fuck this up, you're probably gonna [negative outcome].",
  "When you start to [outcome] but you don't [habit/action], you start to lose [dream outcome].",
  "I don't agree with this trend on this app that's like…",
  "I'm starting to notice any cool guy I've ever met always has a cooler sister.",
  "[thing 1] or [thing 2]? Now having done both, let me tell you the pros and cons, so you know what to expect.",
  "Reasons why you should [action/solution]. I'm going to get straight into the point, so if you're struggling with making that decision, this will push you over the edge.",
  "Use/take [thing 1] or [thing 2]? Today I'm going to tell you the pros and cons so you know what to expect.",
  "I don't know who needs to hear this but if you're a [title] and you've been [action], and [nightmare problem], bro. [opinion].",
  "When I tell yall [problem] has gotten so bad, my homie has to [action] now.",
  "I'm not gonna lie to yall, this [thing] hate is gettin crazy. It's always that one person talkin about… [quote/paraphrase]",
  "If I became the president of the United States today, the first thing that I'm banning is [thing creator hates].",
  "Yall ever got [outcome] and then you realized there wasn't splish you could do about it? I used to have a friend who was [story].",
  "A lot of yall be talkin about, \"oh I'm top 3 [thing],\" but don't even know what [thing] looks like. I'm gonna tell yall about the most [thing] shi I've ever done.",
  "Is it possible to {personal goal} in 1 DAY/WEEK/MONTH?",
  "I just spent $X on {thing}, and…{other hook}.",
  "I LOVE {thing}. So in order to learn more about {thing}, today I decided to {personal action}.",
  "THIS is my {thing}. And today, we're going to {personal action, related to thing}.",
  "I have an irrational fear of {personal fear}",
  "I have been {adjective} for as long as I can remember. And at this point, I'm just gonna {personal action}.",
  "I have wanted {personal goal} for the longest time, but today is the day we finally {personal action}.",
  "I feel really {feeling/adjective}. Because I just {personal action}.",
  "I have a confession to make. I regret {personal action}.",
  "Come with me as I {action}.",
  "Today, we {action;past tense}, and I {feeling}.",
  "Tonight, I'm {action}.",
  "Today is the first time I'm {action}, and I'm {feeling}.",
  "I have X days left of my college/highschool semester, and/but/so…",
  "I have X days left of being {personal title}, and/but/so…",
  "I have been {personal action/title} for the past X hours/days/months/years, and I wanna show you guys…",
  "So I just found out, if you {personal action}, you can",
  "It is {time}AM/PM and I am {feeling}. So today, I'm going to be {personal action}.",
  "You guys are overreacting. I just {personal action}, and {opinion on personal action}.",
  "{Question}. This is a question I ask myself every single day as a {profession/title}.",
  "\"{Statement}. This is something I tell myself every single day as a {profession/title}. Like everyone else, I'm just trying to {personal goal}.",
  "I regret {personal action} as a {profession}.",
  "I regret {personal action}. Well, kind of.",
  "I spent the last X hours/days/months doing {personal action}, and I realized that {opinion}.",
  "I spent the last X hours/days/months/years chasing {personal goal}, but today is the day I realized that {opinion}.",
  "Hi, I'm {name}. And… {use other hook}.",
  "I just {personal action}, and I'm now realizing that {opinion}.",
  "I used to be obsessed with {thing related to personal action}, but today is the day we finally {personal action related to thing}",
  "Today I learned it is actually possible to {personal action} without {condition}.",
  "I was having a conversation with this girl today, and she said, \"{quote of what person said to you},\" and one of my very toxic traits is that I like to {}, so I said…",
  "Somebody asked me why I'm {trait} that's because I'm dedicated to {thing}.",
  "My favorite thing about being the family disappointment is that {opinion/story}.",
  "Here is my full day of eating that I used to increase my muscle mass as a [title/profession].",
  "I've completed {thing/goal} at _ years old. And if you don't know what I'm talking about, let me explain.",
  "Today was my last day of work/school, and one of my coworkers said, it's only a trend to hate on [thing].",
  "The bad news is, [controversial opinion]. The good news is, [same controversial opinion]. So just [action].",
  "Why is it so hard to [action]?",
  "They said, just [action, preferably popular wisdom]. That's a lie.",
  "What if I told you I got [number] more in [thing], JUST by [action]? Here's how I did it.",
  "What if I told you I increased my [thing] JUST by [action]? Here's how I did it.",
  "You know, I'm sick of seeing people on TikTok/Instagram being like \"Oh, [opinion paraphrased in a casual way].\" Oh, so [opinion]? Well, [examples disproving opinion]",
  "Having a [thing] is the most underrated shit, I now [action, explaining why thing is good].",
  "You know, I can't stand the people that come to me and be like, \"Yo, [opinion].\"",
  "For those of you who are too closed-minded to understand [idea], I'm going to change your mind.",
  "Cus you need to [action]. You need to [synonym of action]. If you're not [dream result], you need to [action]. Fuck all these people that are telling you [opposite of action].",
  "You don't [action] as much as you say you do. You like to talk about it, you like to post about it.",
  "If you're [situation], and then [situation] happens, like \"[quote paraphrasing event],\" or \"[secondary quote paraphrasing event],\" if it's within reason, then [opinion].",
  "Some of you have got to cut [thing], the thought of [thing synonym] out of your life, and here's why. Most of the time, when I see [identity] trying to [thing], it's because they're [deeper motivation that's darker].",
  "You have to believe [thing]. Every fiber of your being has to believe it. And I want you to believe it. Because you need to understand that if you don't believe it, then you just [consequence].",
  "One of my favorite hobbies is [odd thing].",
  "2025 is here. You need [thing]. It's not hard.",
  "How much can I [action] in a week as a X year-old full-time [identity]?",
  "I just got the strong urge to talk about some of the biggest [niche] myths that people still believe that keep them [negative situation] and [stronger example depiction of negative situation].",
  "With all due respect, if you are an [identity], and you are still [action], grow the f*ck up. You will [highly specific description of negative life outcome].",
  "Growing up is understanding that [controversial opinion].",
  "A year ago, I was [action], and [extended action] every single night because I couldn't [overcome big problem].",
  "After 3 years of cycling through [thing 1] and [thing 2], I [solution] because I realized ONE THING… [truth].",
  "2 years ago, I became addicted to [bad thing] every single day because I'd never felt more [bad emotion] in my LIFE.",
  "If you're cursed with being [relatable identity] and [related adjective], the first thing I want you to do is watch this video til it's completion. If you can prove you can sit through this entire video without scrolling, that's the first step.",
  "I made a website called www.[insert long relatable painpoint].com",
  "In Clash Royale, you're constantly faced with opportunity cost, even if you don't notice it. Imagine your opponent drops a Mega Knight at the bridge.",
  "I was not born a genius, but I do know how to [do thing]. So let me show you how to [outcome] like this {screenshot}, in any [thing], just by [action]ing the right way, and not by being a genius.",
  "How to [do specific thing], coming from someone who [dream perfect outcome] throughout [timeframe].",
  "I refuse to go outside looking like this, which means I haven't been to [place] in WEEKs, but the crazy thing is, my [outcome related to place] have actually improved.",
  "Why is it that the laziest people always do the best in [competitive thing]?",
  "I figured out how to [dream outcome] with ZERO effort. Here's the exact method, and I'm gonna PROVE IT to you in the next 60 seconds.",
  "This represents your X before, during, and after X",
  "Here's exactly how much (insert action/item) you need to (insert result)",
  "Can you tell us how to (insert result) in 60 seconds?",
  "This is what (insert thing) looks like when you're (insert action). And this is what they look like when you're not (insert action).",
  "I'm going to tell you how to get (Insert result), (insert mind blowing method).",
  "It took me 10 years to learn this but I'll teach it to you in less than 1 minute.",
  "When you get (insert item/result) here are the  things you got to do right away.",
  "If you don't have (insert item/action), do (insert item/action).",
  "My money rules as a (insert description) working towards financial independence.",
  "Money can buy you (insert item) but it can not buy you (insert result).",
  "Here's how to develop a (insert skill) so strong that you physically can't stop (doing skill).",
  "This is what (insert ) of (insert item) looks like.",
  "If I woke up (insert pain point) tomorrow, and wanted to (insert dream result) by (insert time) here's exactly what I would do.",
  "If you're a (insert target audience) and you want (insert dream result) by (insert avenue) then listen to this video.",
  "If you are (insert age group or range) do not do (insert action).",
  "As an (insert trait) responsible (insert age) year old with a goal to (insert goal) here are 3 things I will never regret doing.",
  "Not to flex, but I'm fretty f*cking good at (insert skill/niche).",
  "This is what (insert object/item) looks like when you are using/doing (insert product/service).",
  "Are you still (insert action)? I've got (insert result) in (insert time frame) and I have never (insert action).",
  "3 Youtube channels that will teach you more than any (insert industry/niche) degree.",
  "I think I just found the biggest (insert niche/industry) cheat code.",
  "Here are 3 people who will make you a better (insert title).",
  "(insert trait) Guy vs (insert trait) Guy.",
  "I see you doing nothing but (insert action) after (insert event) so follow this agenda to avoid that.",
  "Want to be the first (insert dream result) in your family?",
  "This is how many (insert item) you need to (insert result).",
  "Everyone tells you to (insert action) but nobody actually tells you how to do it. Here is a  second step by step tutorial that you can save.",
  "If you're (insert age range) these are the  things you need to do so you don't end up (insert pain point) by (insert age).",
  "If I were starting over in my (insert age range) with no (insert item) here are the top  things I would do to (insert dream result).",
  "Here are some slightly unethical (insert industry/niche) hacks that you should know if you're (insert target audience).",
  "Here's exactly how you're gonna lock in if you want to (insert dream result).",
  "This is the same exact (insert thing) but the first is/got (insert result and the second is/got X",
  "If you want to end up (insert pain point) then skip this video.",
  "We have never used (insert noun) in our home because we have found it to be generally (insert trait/traits).",
  "(insert action) for (insert period of time) and you will get (insert dream result).",
  "If youâre between the ages of (insert age) to (insert age) and you feel like (insert pain point).",
  "(insert before state) to (insert after state) in  simple steps in under  of seconds.",
  "If you're trying to (insert dream results) then here is the one (insert thing) you should do.",
  "How long do you think you have to (insert action) to (insert result).",
  "If you want to do this, first do this.",
  "If youâre trying to (insert dream result) and you haven't got a clue what to (insert action) on a daily basis I am going to show you an example.",
  "This is how many (insert item) you need to (insert result).",
  "Iâm gonna save you  of minutes off your next workout with  of simple tips.",
  "If I only had (insert time frame) in the (insert location/place) this is exactly what I would do to get (insert dream result).",
  "How long can you skip (insert action) before losing (insert result).",
  "If you want to (insert dream result) a week for the next (insert weeks) without (insert pain point) then listen up.",
  "If you just turned (insert age) and you donât want to (insert pain point) then you should do the following  things immediately.",
  "You can have a perfect (insert dream result) by simply dumbing it down.",
  "Did you know that this, this, this, and this get (insert dream result).",
  "Donât start doing (insert action) until you learn how to do this.",
  "(insert industry) tier list for (insert year).",
  "In 60 seconds iâm going to teach you more about (insert thing) than you have ever learned in your entire life.",
  "Everyone tells you to (insert action) but no one actually shows you how to do it. Here is a  second step by step tutorial that you can save for later.",
  "If youâre in your (insert 20âs, 30âs, 40âs, 50âs, 60â, etc) then these are the  of things you need to do to make sure you don;t end up (insert pain point) by (insert age).",
  "(Insert noun) loses (Insert noun) on this, so they can make (insert noun) on this.",
  "You have (insert noun) tomorrow but you have no time to (insert action). Hereâs how you save your (insert noun).",
  "(Insert scenario) and (Insert dream result), here are the  of steps to get (insert dream result).",
  "Everyone tells you to do (insert action) but you think itâs too late because you are (Insert age). I am a (insert occupation) and these are  of things you need to know in your (Insert age).",
  "(Insert target audience) if you're serious about playing at the next level.",
  "You only have to be dialed in on  of things to be an elite (insert title).",
  "(Insert noun) for dummies.",
  "Donât hate me but I donât really mind (insert noun).",
  "If you want to do this, first do this.",
  "Best ways to save money while (insert action).",
  "This is every way to (insert action).",
  "What if I told you this (insert item) could (insert result).",
  "Did you know that if you (insert action, (Insert action), (insert action), etc.",
  "The (insert thing) you have now in you (insert age group) is so (insert noun).",
  "At age (insert age) the age that many (insert target audience) is when (insert pain point).",
  "Listen if youâre not forcing your (insert person/persons) to (insert action) in their (insert current state) donât expect them to be (insert trait) in their (insert after state).",
  "Would you rather watch your (insert person/persons) (insert pain point) or join them in their (insert niche) journey to save their lives?",
  "This is the amount of (insert noun) you would lose per day in a (insert state).",
  "If your in a (insert dream result) journey, this is exactly what you need to do to (insert dream goal) in  simple steps.",
  "If you told me  of years ago Iâd be (insert dream result) I wouldn't have believed you.",
  "If your getting (insert adjective) or know someone (insert adjective) there are  of incredulity important things you need to make sure you can do physically in order to (dream result).",
  "If you donât want to fail (insert life event).",
  "I crammed the hardest (insert noun) and (insert dream result).",
  "If youâre cooked for your (insert life event) but still canât find the motivation to do (insert action) youâre gonna want to see this.",
  "Hereâs the difference between (insert title), (insert title), and (insert title).",
  "If I were in my (insert age range) here is exactly how I would avoid (insert bad result).",
  "Hereâs every (insert noun) that you actually need to know.",
  "The most important things I will teach my kids as a (insert job title).",
  "If you canât solve this (insert problem) in under 5 seconds go back to (insert pre-qualifying stage).",
  "30 seconds of (insert industry) advice I give my best friend if he/she were starting from scratch.",
  "I would do this before quitting your job.",
  "If you do this youâll (insert result).",
  "If your a (insert target audience) who (insert pain point) and you want to (insert dream result) let's go over a very simple  step plan you can follow to quickly (insert dream result).",
  "Here are 5 books to (insert dream result) better than 99% of other people.",
  "If you're somebody who (insert action) and your goal is to (insert dream result) and (insert dream result) at the same time. Then here are my  best tips.",
  "If you can't do (insert action).",
  "If you can do  of (insert action), than you can do  of (insert action).",
  "If your mom didnât teach you how to make (insert noun) growing up, don't worry i'm your mommy now.",
  "Never lose a game of (insert game) for the rest of your life.",
  "3 levels of (insert noun).",
  "Did you know that if youâ¦ (Insert action), (insert action), (insert action), etc",
  "I am a professional (insert industry) hacker, and here's every hack at (insert store/location/event/etc).",
  "I have a very long list of (insert noun) that I (insert action) that I gate keep from other people. But today I feel like giving back so I am going to tell you.",
  "I am going to teach you how to identify a good (insert noun) to a bad (insert noun).",
  "I went to (insert school type) so you don't have to.",
  "Ranking all the most popular (insert noun), so I can rank them from worst to best.",
  "Here is how I (insert action) as a (insert label) (insert age).",
  "You wouldn't get (insert bad result) when you (insert action) if you (insert action).",
  "This is harder than getting into Harvard.",
  "Now how much does it really cost to (insert action).",
  "This is why no one remembers you.",
  "I'm 20 which means my teenage years are officially over, so here;s everything I learned from the 7 most weirdest years of my life.",
  "If you're a (target audience) and you want to become (insert dream result) by (insert action) then listen to this video because you have such a big advantage and I will tell you how to conquer it.",
  "If you take (insert noun) it will (insert result).",
  "I just made a website called (insert the longest but most relatable website name).",
  "How to turn just one (insert noun) into a lifetime of free (insert noun).",
  "Things that are damaging your (insert noun) without you even realizing it.",
  "If you have when you see a girl and she just has (insert dream result).",
  "I've (insert dream result) despite having (insert pain point) and this is the routine that did it.",
  "Swap these (insert noun) for better (insert result).",
  "Did you know that this, this, and this target (insert dream result).",
  "Your (insert noun) looks like this and you want them to look like this.",
  "(Insert last year) (insert noun), (insert current year) (insert noun).",
  "Okay (insert pain point), how about we don't f up (insert current year)",
  "This is the program/steps I would follow if I was trying to (insert dream result).",
  "If your (insert noun) looks anything like this, these are not (insert noun) these are (insert noun) and here is how you can get (insert dream result).",
  "Here are some (insert action) you can do without (insert noun).",
  "Let's find out what (insert noun) you are in  steps.",
  "Most people can only do (insert action) when trying to (insert action) but as an (insert title) you should be able to (insert action).",
  "As an (insert title) you should be able to do this, if you can't (insert diagnosis).",
  "If you're an (insert title) you should be able to do this, this, and this. If you can't I got you, just do this  step/routine/program to (insert dream result).",
  "If you have (insert pain point), (insert pain point), and (insert pain point) you might be (insert action) wrong.",
  "If you feel like your never (insert point) here is everything you need for a (insert dream result).",
  "Do you have a (insert pain point) donât waste your money trying to (insert solution) it's just going to come back.",
  "If giving yourself (insert result) causes (insert pain point), (insert pain point), and (insert pain point) here is how I cheat it.",
  "You don't have (insert pain point), your not (insert adjective), your not (insert adjective) you just need to (insert solution) and I am going to tell you how to do it.",
  "Worst thing you can do for your (insert thing) is to ignore your (insert noun) when (insert scenario).",
  "Ladies, you can do all the (insert action) but that's not going to do sh*t for your (insert noun).",
  "Never (insert action) first and then (insert action).",
  "What happens when you go X hours/days/weeks/years without (insert noun).",
  "There is no doubt in my mind that (insert action) are the best (insert noun) for your (insert noun).",
  "Don't touch this.",
  "What I wish I knew at (insert age) instead of (insert age).",
  "You're damaging your (insert noun) if you (insert noun) looks like this or like this.",
  "My most complemented (insert noun) of (insert year).",
  "I have been dating my girlfriend/boyfriend for  years here are  basics I learned that every guy/girl should do for a partner in (insert scenario).",
  "When I say I (insert action) everyday and I don't (insert action) everyday people always ask me…",
  "of ways to raise (insert adjective) children.",
  "It's okay f you mom didn't talk to you about",
  "The reason you can't (insert dream result) to get that (insert dream result) you keep talking about is because…",
  "This is your (insert noun) on a regular day, this is you (insert noun) on (insert scenario).",
  "You guys know this look, when someone perfectly (insert action) and (insert action) I am obsessed with this (insert noun).",
  "You crave (insert noun) on your (insert scenario) here's why.",
  "This is you (insert noun) when you (insert action), and this is your (insert noun) when you (insert action).",
  "I have (insert noun) commercial (insert noun).",
  "Stop (insert action) if you actually want to (insert dream result).",
  "This is how much (insert dream result) you achieve if you (insert action), and this is how much (insert dream result) if you (insert action) and these  of hacks.",
  "If you want to (insert  of dream result) per week this is how you are going to do it.",
  "This is for the homies who promised (insert person/persons) and nice and fancy (insert noun).",
  "What if I told you, you could (insert action) for only (insert low cost).",
  "Why did it take me over  years to realize you can make (insert result) in  minutes.",
  "Don't hate me but I donât really mind (insert basic niche thing) but don;t worry I am going to show you how to make it way better.",
  "(insert dream result) and (insert dream result) with these  of tips. For reference I have (insert personal result).",
  "If you have a (insert dream result) keep scrolling. Today we are going to talk about a (insert routine, method, strategy) to (insert dream result)",
  "Did you know that if you (insert action), (insert action), (insert action), etc.",
  "Here's exactly how much (insert noun) you can make with under (insert dollar amount).",
  "The lack of clinical studies on (insert noun) isn't because it doesn't work, it's because…",
  "You'll never get (insert dream result) in your (insert age range) if you don;t do these 3 things when you turn (insert age).",
  "lessons,  of (insert person/persons), in  of days/weeks/months.",
  "I make more money than doctors, engineers, and lawyers and no I didn't go to college for more than 6 years to get a degree.",
  "I worked at (insert company) for X months/years and now I am exposing everything they keep from customers.",
  "This is what (insert money amount) will get you in (insert location).",
  "How much do I need to make or buy a (insert price) (insert noun).",
  "I make (insert hourly rate) can I qualify/buy (insert loan/noun).",
  "Let's see what your monthly payment would look like if you owned (insert noun).",
  "Lets see what $1,800 a month gets you in (insert location).",
  "If you are paying over (insert price amount) for a (insert noun), you might as well buy a (insert noun).",
  "I have made a spreadsheet with over (insert large number) of (insert noun).",
  "This is (insert large number) of (insert noun).",
  "There is one thing above all that sets the top (insert title) apart from the rest.",
  "This is how I would (insert action) if I were starting from scratch).",
];

// Select best matching templates from proven hooks and fill in placeholders
const selectBestTemplates = async (description: string): Promise<Hook[]> => {
  try {
    // Create a sample of templates to send to AI (100 random for context)
    const templateSample = PROVEN_TEMPLATES.sort(() => Math.random() - 0.5).slice(0, 100);

    const selectionResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `You are an expert at analyzing viral social media hooks. A creator is making a video about: "${description}".

Here are 100 proven viral hook templates that have been tested and verified to work. These templates have [brackets] that need to be filled in with specific content:

${templateSample.map((h, i) => `${i + 1}. "${h}"`).join('\n')}

Your job:
1. Select the BEST 3 hook templates from this list that would work PERFECTLY for this video topic
2. FILL IN ALL THE BRACKETS with specific, relevant details based on "${description}"
3. SHOW YOUR WORK by making what you filled in BOLD and putting the bracket name in parentheses

Example: If the video is about "learning to build a paper airplane", and you select the template "Alright I'm gonna teach you exactly how to [outcome] in one video." - you would fill it in as: "Alright I'm gonna teach you exactly how to **build a paper airplane** (outcome) in one video."

Return ONLY a JSON array with 3 objects containing the hook with bold substitutions AND the plain text version for use:
[{"hook": "Alright I'm gonna teach you exactly how to **build a paper airplane** (outcome) in one video", "hookPlain": "Alright I'm gonna teach you exactly how to build a paper airplane in one video", "relevanceScore": 85}, ...]`,
        },
      ],
      temperature: 0.7,
    });

    const selectionContent = selectionResponse.choices[0].message.content;
    if (!selectionContent) throw new Error('No content from template selection');

    const selectionMatch = selectionContent.match(/\[[\s\S]*\]/);
    if (!selectionMatch) throw new Error('Could not parse selected templates');

    const selectedTemplates = JSON.parse(selectionMatch[0]) as Array<{ hook: string; hookPlain: string; relevanceScore: number }>;

    // Convert to Hook format with template metadata
    // Store both markdown (for display) and plain text (for copying)
    return selectedTemplates.map((t) => ({
      hook: t.hook, // Markdown version with bold and brackets
      hookPlain: t.hookPlain, // Plain text version for copying
      score: t.relevanceScore,
      section: 'templates' as const,
      isTemplate: true,
    }));
  } catch (error) {
    console.error('Template selection error:', error);
    throw error;
  }
};

// Generate 2 original hooks not in the template database
const generateOriginalHooks = async (description: string, tone: Tone): Promise<Hook[]> => {
  try {
    const toneInstructions: Record<string, string> = {
      funny: 'Use humor, witty jokes, puns, and laugh-out-loud moments. Make it entertaining and silly.',
      dramatic: 'Use suspense, cliffhangers, shocking revelations, and intense language. Build tension.',
      inspirational: 'Use motivational language, uplifting messages, personal growth, and empowerment themes.',
      urgent: 'Use urgent language, FOMO (fear of missing out), time-sensitive calls to action, and high-energy words.',
      casual: 'Use relaxed, conversational tone, slang, and friendly language. Keep it chill and approachable.',
      professional: 'Use formal, authoritative tone, industry expertise, data-driven insights, and credibility markers.',
    };

    const generationResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `You are an expert at creating completely original, never-before-seen viral social media hooks. Generate 2 COMPLETELY ORIGINAL (not templates) ${tone} hooks for a video about: "${description}".

These hooks MUST be:
- Short, punchy, and memorable
- Stop-scrollers (people MUST click)
- COMPLETELY ORIGINAL and unique (not based on common templates)
- Specific to the topic
- Creative and unexpected

Tone: ${toneInstructions[tone]}

Generate 2 unique, creative, original hooks that would make people stop scrolling:

Return ONLY a JSON array with no markdown, no explanation:
[{"hook": "hook text here"}, {"hook": "hook text here"}]`,
        },
      ],
      temperature: 0.95,
    });

    const generatedContent = generationResponse.choices[0].message.content;
    if (!generatedContent) throw new Error('No content from original generation');

    const jsonMatch = generatedContent.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Could not parse original hooks');

    const originalHooks = JSON.parse(jsonMatch[0]) as Array<{ hook: string }>;

    // Score the original hooks
    const hooksText = originalHooks.map((h) => h.hook).join('\n');
    const scoringResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Score these completely original ${tone} hooks on a scale of 1-100 based on their engagement potential and how well they match the topic "${description}". Return as JSON array with objects containing "hook" and "score" fields:\n${hooksText}`,
        },
      ],
      temperature: 0.5,
    });

    const scoringContent = scoringResponse.choices[0].message.content;
    if (!scoringContent) throw new Error('No content from scoring');

    const scoringMatch = scoringContent.match(/\[[\s\S]*\]/);
    if (!scoringMatch) throw new Error('Could not parse scores');

    const scoredHooks = JSON.parse(scoringMatch[0]) as Array<{ hook: string; score: number }>;

    // Convert to Hook format with original metadata
    return scoredHooks.map((h) => ({
      hook: h.hook,
      score: h.score,
      section: 'created' as const,
      isTemplate: false,
    }));
  } catch (error) {
    console.error('Original hook generation error:', error);
    throw error;
  }
};

export const generateHooks = async (description: string, tone: Tone): Promise<Hook[]> => {
  try {
    // Orchestrate the hybrid flow
    const [templates, originals] = await Promise.all([
      selectBestTemplates(description),
      generateOriginalHooks(description, tone),
    ]);

    // Combine templates and originals
    const allHooks: Hook[] = [...templates, ...originals];

    // Sort by score descending
    return allHooks.sort((a, b) => b.score - a.score);
  } catch (error) {
    console.error('Hook generation orchestration error:', error);
    throw error;
  }
};
