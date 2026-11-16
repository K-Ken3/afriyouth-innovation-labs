/* ============================================================================
   90-main.js : run order
   ========================================================================= */

async function main() {
  await figma.loadAllPagesAsync();
  await initFonts();
  await initImages();

  await cleanupGenerated();
  buildStyles();
  buildVariables();

  const foundationsPage = getOrCreatePage("01 · Foundations", ["Foundations", "00 · Foundations"]);
  await buildFoundations(foundationsPage);

  const componentsPage = getOrCreatePage("02 · Components", ["Components", "Component Library"]);
  await buildComponents(componentsPage);

  await buildAllPages();
  await buildInteractionFlows();
  await buildHandover();

  const linked = applyReactions(FRAMES);
  const frames = Object.keys(FRAMES).length;
  figma.notify("AfriYouth: " + frames + " frames built · " + linked + " interaction links wired", { timeout: 9000 });
  figma.closePlugin();
}

main().catch((error) => {
  const message = error && error.message ? error.message : String(error);
  console.error(error);
  figma.notify("AfriYouth build stopped: " + message, { error: true, timeout: 20000 });
  figma.closePlugin();
});
