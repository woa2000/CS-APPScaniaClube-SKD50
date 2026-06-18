const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const iosRoot = path.join(repoRoot, 'ios');

const fileGroups = {
	fmtBase: [
		path.join(iosRoot, 'Pods', 'fmt', 'include', 'fmt', 'base.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Public', 'fmt', 'fmt', 'base.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Private', 'fmt', 'fmt', 'base.h')
	],
	fmtFormat: [
		path.join(iosRoot, 'Pods', 'fmt', 'include', 'fmt', 'format.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Public', 'fmt', 'fmt', 'format.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Private', 'fmt', 'fmt', 'format.h')
	],
	fmtCompile: [
		path.join(iosRoot, 'Pods', 'fmt', 'include', 'fmt', 'compile.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Public', 'fmt', 'fmt', 'compile.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Private', 'fmt', 'fmt', 'compile.h')
	],
	fmtFormatInl: [
		path.join(iosRoot, 'Pods', 'fmt', 'include', 'fmt', 'format-inl.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Public', 'fmt', 'fmt', 'format-inl.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Private', 'fmt', 'fmt', 'format-inl.h')
	],
	follyFmtCompile: [
		path.join(iosRoot, 'Pods', 'RCT-Folly', 'folly', 'portability', 'FmtCompile.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Public', 'RCT-Folly', 'folly', 'portability', 'FmtCompile.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Private', 'RCT-Folly', 'folly', 'portability', 'FmtCompile.h')
	],
	follyRuntimeFiles: [
		path.join(iosRoot, 'Pods', 'RCT-Folly', 'folly', 'lang', 'Exception.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Public', 'RCT-Folly', 'folly', 'lang', 'Exception.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Private', 'RCT-Folly', 'folly', 'lang', 'Exception.h'),
		path.join(iosRoot, 'Pods', 'RCT-Folly', 'folly', 'container', 'MapUtil.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Public', 'RCT-Folly', 'folly', 'container', 'MapUtil.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Private', 'RCT-Folly', 'folly', 'container', 'MapUtil.h'),
		path.join(iosRoot, 'Pods', 'RCT-Folly', 'folly', 'portability', 'SourceLocation.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Public', 'RCT-Folly', 'folly', 'portability', 'SourceLocation.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Private', 'RCT-Folly', 'folly', 'portability', 'SourceLocation.h'),
		path.join(iosRoot, 'Pods', 'RCT-Folly', 'folly', 'detail', 'IPAddressSource.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Public', 'RCT-Folly', 'folly', 'detail', 'IPAddressSource.h'),
		path.join(iosRoot, 'Pods', 'Headers', 'Private', 'RCT-Folly', 'folly', 'detail', 'IPAddressSource.h'),
		path.join(iosRoot, 'Pods', 'RCT-Folly', 'folly', 'concurrency', 'CacheLocality.cpp')
	]
};

function patchFile(filePath, transform) {
	if (!fs.existsSync(filePath)) {
		console.log(`[fmt-patch] skip missing: ${path.relative(repoRoot, filePath)}`);
		return false;
	}

	const original = fs.readFileSync(filePath, 'utf8');
	const patched = transform(original);

	if (patched !== original) {
		fs.chmodSync(filePath, 0o644);
		fs.writeFileSync(filePath, patched);
		console.log(`[fmt-patch] patched: ${path.relative(repoRoot, filePath)}`);
		return true;
	}

	console.log(`[fmt-patch] unchanged: ${path.relative(repoRoot, filePath)}`);
	return false;
}

if (!fs.existsSync(path.join(iosRoot, 'Pods'))) {
	console.log('[fmt-patch] ios/Pods not found, nothing to patch');
	process.exit(0);
}

for (const filePath of fileGroups.fmtBase) {
	patchFile(filePath, (content) =>
		content
			.replace(
				'#if FMT_USE_CONSTEVAL',
				'#if 0 /* patched by scripts/patch-ios-fmt.js to avoid Apple clang consteval build failures */'
			)
			.replace(
				'FMT_CONSTEVAL FMT_ALWAYS_INLINE basic_format_string(const S& s) : str_(s) {',
				'FMT_ALWAYS_INLINE basic_format_string(const S& s) : str_(s) {'
			)
	);
}

for (const filePath of fileGroups.fmtFormat) {
	patchFile(filePath, (content) =>
		content.replace(
			/#define FMT_STRING\(s\)\s+FMT_STRING_IMPL\(s, fmt::detail::compile_string, \)/g,
			'#define FMT_STRING(s) fmt::runtime(s)'
		)
	);
}

for (const filePath of fileGroups.fmtCompile) {
	patchFile(filePath, (content) =>
		content
			.replace(
				/#\s*define FMT_COMPILE\(s\) FMT_STRING_IMPL\(s, fmt::compiled_string, explicit\)/g,
				'#  define FMT_COMPILE(s) fmt::runtime(s)'
			)
			.replace(
				/#\s*define FMT_COMPILE\(s\) FMT_STRING\(s\)/g,
				'#  define FMT_COMPILE(s) fmt::runtime(s)'
			)
	);
}

for (const filePath of fileGroups.fmtFormatInl) {
	patchFile(filePath, (content) => content.replace(/FMT_STRING\(/g, 'fmt::runtime('));
}

for (const filePath of fileGroups.follyFmtCompile) {
	patchFile(filePath, (content) =>
		content.replace(
			/#else\n\n#define FOLLY_FMT_COMPILE\(format_str\) FMT_COMPILE\(format_str\)\n\n#endif/g,
			'#else\n\n#define FOLLY_FMT_COMPILE(format_str) format_str\n\n#endif'
		)
	);
}

for (const filePath of fileGroups.follyRuntimeFiles) {
	patchFile(filePath, (content) =>
		content
			.replace(
				'    fmt::format_string<detail::throw_exception_arg_fmt_t<Args&&>...>;',
				'    fmt::string_view;'
			)
			.replace(
				'throw_exception<E>(fmt::format("{}{}", exceptionStrPrefix, key));',
				'throw_exception<E>(fmt::format(fmt::runtime("{}{}"), exceptionStrPrefix, key));'
			)
			.replace(
				'      "{}:{} [{}]",',
				'      fmt::runtime("{}:{} [{}]"),'
			)
			.replace(
				'          "Invalid mask length: {}. Mask length must be <= {}",',
				'          fmt::runtime("Invalid mask length: {}. Mask length must be <= {}"),'
			)
			.replace(
				'throw std::runtime_error(fmt::format("error parsing list \'{}\'", line));',
				'throw std::runtime_error(fmt::format(fmt::runtime("error parsing list \'{}\'"), line));'
			)
	);
}

console.log('[fmt-patch] completed');
