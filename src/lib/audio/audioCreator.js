export function createSoundBuffer(context, lengthInSeconds, soundGenerator) {
  const channels = 2;
  const frameCount = context.sampleRate * lengthInSeconds;
  let buffer = context.createBuffer(channels, frameCount, context.sampleRate);

  for (let channel = 0; channel < channels; channel++) {
    let nowBuffering = buffer.getChannelData(channel);
    for (var i = 0; i < frameCount; i++) {
      nowBuffering[i] = soundGenerator(i, frameCount, context.sampleRate);
    }
  }
  return buffer;
}
