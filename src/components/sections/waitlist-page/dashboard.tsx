'use client';

import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Copy, Check, Twitter, Linkedin, MessageSquare, Award, Shield, Star, Trophy, Users, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const tiers = {
  none: { name: 'No Badge', goal: 3, next: 'Advocate', nextIcon: Award, nextColor: 'text-orange-500' },
  advocate: { name: 'Advocate 🥉', goal: 10, next: 'Champion', nextIcon: Shield, nextColor: 'text-slate-500' },
  champion: { name: 'Champion 🥈', goal: 25, next: 'Ambassador', nextIcon: Star, nextColor: 'text-yellow-500' },
  ambassador: { name: 'Ambassador 🥇', goal: Infinity, next: '', nextIcon: Star },
};

const tierColors: { [key: string]: string } = {
  none: 'text-cyan',
  advocate: 'text-orange-500',
  champion: 'text-slate-500',
  ambassador: 'text-yellow-500',
}

const tierIcons: { [key: string]: React.ElementType } = {
  none: CheckCircle,
  advocate: Award,
  champion: Shield,
  ambassador: Star,
}

export default function WaitlistDashboard({ waitlistEntry }: { waitlistEntry: any }) {
  const [copied, setCopied] = useState(false);
  const [msgCopied, setMsgCopied] = useState(false);

  const referralLink = `https://lumivex.com/waitlist?ref=${waitlistEntry.referralCode}`;

  const copyToClipboard = (text: string, type: 'link' | 'msg') => {
    navigator.clipboard.writeText(text);
    if (type === 'link') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setMsgCopied(true);
      setTimeout(() => setMsgCopied(false), 2000);
    }
  };

  const currentTierInfo = tiers[waitlistEntry.referralTier as keyof typeof tiers];
  const progressPercent = currentTierInfo.goal === Infinity ? 100 : (waitlistEntry.referralCount / currentTierInfo.goal) * 100;
  
  const shareMessage = `I just joined @Lumivex waitlist! 🚀\n\nBuild AI agents with just conversation - no coding needed.\n\nUse my code: ${waitlistEntry.referralCode} when you join and we both move up!\n\nJoin here: ${referralLink}`;
  
  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;
    window.open(twitterUrl, '_blank');
  };
  
  const shareOnLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(referralLink)}&title=${encodeURIComponent('Join the Lumivex Waitlist!')}&summary=${encodeURIComponent(shareMessage)}`;
    window.open(linkedInUrl, '_blank');
  };

  const joinedDate = waitlistEntry.joinedAt?.toDate ? format(waitlistEntry.joinedAt.toDate(), 'MMMM d, yyyy') : 'a while ago';

  return (
    <div className="py-16">
        <div className="container mx-auto px-4">
             <div className="max-w-3xl mx-auto text-center">
                 <h1 className="text-5xl font-light text-navy mb-4">
                    You're on the list! 🎉
                </h1>
                <p className="text-lg text-charcoal/80 leading-relaxed max-w-2xl mx-auto mb-12">
                   You joined on {joinedDate}. Share your code to move up in line!
                </p>
            </div>

            <div className="max-w-3xl mx-auto bg-white border-2 border-cyan rounded-3xl p-8 md:p-12 shadow-2xl shadow-cyan/20">
                {/* Referral Code Section */}
                <div className="text-center">
                    <p className="text-base font-semibold text-charcoal uppercase tracking-wider mb-4">Your Referral Code</p>
                    <div className="p-8 bg-cream rounded-2xl border-2 border-dashed border-cyan">
                        <p className="font-mono text-5xl font-bold text-navy tracking-widest">{waitlistEntry.referralCode}</p>
                    </div>
                     <Button 
                        size="lg"
                        className="mt-6 bg-cyan hover:bg-cyan/90"
                        onClick={() => copyToClipboard(waitlistEntry.referralCode, 'link')}
                    >
                        {copied ? <Check className="mr-2 h-5 w-5" /> : <Copy className="mr-2 h-5 w-5" />}
                        {copied ? 'Copied!' : 'Copy Code'}
                    </Button>
                    <p className="mt-4 text-charcoal max-w-md mx-auto">Share this code with friends. When they use it, you both move up 10 positions!</p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
                        <Trophy className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                        <p className="text-xs text-slate-500 uppercase font-semibold">Your Position</p>
                        <p className="text-4xl font-bold text-navy">#{waitlistEntry.currentPosition.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">Base: #{waitlistEntry.basePosition.toLocaleString()}</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
                        <Users className="h-8 w-8 text-cyan mx-auto mb-2" />
                        <p className="text-xs text-slate-500 uppercase font-semibold">Total Referrals</p>
                        <p className="text-4xl font-bold text-navy">{waitlistEntry.referralCount}</p>
                        <p className="text-xs text-slate-400">&nbsp;</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
                        {React.createElement(tierIcons[waitlistEntry.referralTier], { className: `h-8 w-8 ${tierColors[waitlistEntry.referralTier]} mx-auto mb-2`})}
                        <p className="text-xs text-slate-500 uppercase font-semibold">Current Badge</p>
                        <p className={`text-2xl font-bold ${tierColors[waitlistEntry.referralTier]}`}>{currentTierInfo.name}</p>
                         <p className="text-xs text-green-500">+{waitlistEntry.bonusPositions} position boost</p>
                    </div>
                </div>

                {/* Share Options */}
                <div className="text-center">
                     <p className="text-lg font-semibold text-navy mb-4">Share Your Code</p>
                     <div className="flex justify-center gap-4">
                        <Button onClick={shareOnTwitter} className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90"><Twitter className="mr-2"/> Share on X</Button>
                        <Button onClick={shareOnLinkedIn} className="bg-[#0A66C2] hover:bg-[#0A66C2]/90"><Linkedin className="mr-2"/> Share on LinkedIn</Button>
                        <Button onClick={() => copyToClipboard(shareMessage, 'msg')} variant="outline">
                            {msgCopied ? <Check className="mr-2"/> : <MessageSquare className="mr-2"/>}
                            {msgCopied ? 'Copied' : 'Copy Message'}
                        </Button>
                     </div>
                </div>
                
                {/* Progress to Next Badge */}
                {waitlistEntry.referralTier !== 'ambassador' && (
                    <div className="mt-10 bg-gradient-to-r from-cream to-white p-6 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                             <p className="text-lg font-semibold text-navy">Next Badge: {currentTierInfo.next}</p>
                             {React.createElement(currentTierInfo.nextIcon, { className: `h-6 w-6 ${currentTierInfo.nextColor}` })}
                        </div>
                        <Progress value={progressPercent} className="h-3" />
                        <p className="text-sm text-charcoal mt-2">{waitlistEntry.referralCount} of {currentTierInfo.goal} referrals ({currentTierInfo.goal - waitlistEntry.referralCount} more to go!)</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}
