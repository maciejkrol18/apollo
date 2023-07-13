interface AudioWavesProps {
	className: string;
}

const AudioWaves: React.FC<AudioWavesProps> = ({ className }) => {
	return (
		<div className={`flex items-end gap-1 h-6 ${className && className}`}>
			<div className="w-[5px] bg-brand animate-barOne" />
			<div className="w-[5px] bg-brand animate-barTwo" />
			<div className="w-[5px] bg-brand animate-barThree" />
		</div>
	);
};

export default AudioWaves;
