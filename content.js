const checkUrl = () => {
	const url = new URL(location.href);
	const isGitHub = url.origin === 'https://github.com';

	if (!isGitHub) return;

	const isPullRequestsFilesPage =
		url.pathname.includes('/pull/') && url.pathname.includes('/files');

	const isCommitDiffPage = url.pathname.includes('/commits/') || pathname.includes('/commit/'); // The ending "/" is important to know if it's the diff page

	if (!isCommitDiffPage && !isPullRequestsFilesPage) return;

	const queryParams = new URLSearchParams(url.search);

	const noWhiteSpaceSetting = queryParams.get('w') === null;

	if (!noWhiteSpaceSetting) return;

	url.searchParams.set('w', '1');

	location.href = url.href;
};

checkUrl();

let previousUrl = window.location.href;

const observer = new MutationObserver(() => {
	if (window.location.href !== previousUrl) {
		previousUrl = window.location.href;
		checkUrl();
	}
});

observer.observe(document, { subtree: true, childList: true });
