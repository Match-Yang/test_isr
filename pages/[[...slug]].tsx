import React, { useMemo } from "react";
import PreviewLayout from "@/components/preview-layout";
// import { MDXRemote } from "next-mdx-remote";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import {
  CodeBlock,
  CodeGroup,
  Callout,
  Frame,
  Video,
  Heading,
  Button,
  Accordion,
  Tab,
  Tabs,
  Card,
  CardGroup,
  Step,
  Steps,
} from "@spreading/docuo-mdx-component";
import LibControllerImpl from "@/lib";
import DocsControllerImpl from "@/lib/docs-help";
import TreeControllerImpl from "@/lib/tree-help";
import SlugControllerImpl from "@/lib/slug-help";
import LanguageControllerImpl from "@/lib/language-help";
import GroupControllerImpl from "@/lib/group-help";
import PlatformControllerImpl from "@/lib/platform-help";
import VersionsControllerImpl from "@/lib/versions-help";
import PagerControllerImpl from "@/lib/pager-help";
import ShortLinkTransControllerImpl from "@/lib/trans-short-link";
import CategoryTransControllerImpl from "@/lib/category-help";
import CommonControllerImpl from "@/lib/optimize/common";
import Link from "next/link";
import { SlugData, DocuoConfig, TocItem } from "@/lib/types";
import Head from "next/head";
import ApiItem from "@/components/docuoOpenapi/theme/ApiItem";
import MethodEndpoint from "@/components/docuoOpenapi/theme/ApiExplorer/MethodEndpoint";
import ParamsItem from "@/components/docuoOpenapi/theme/ParamsItem";
import MimeTabs from "@/components/docuoOpenapi/theme/MimeTabs";
import TabItem from "@/components/docuoOpenapi/theme-classic/src/theme/TabItem";
import SchemaItem from "@/components/docuoOpenapi/theme/SchemaItem";
import SchemaTabs from "@/components/docuoOpenapi/theme/SchemaTabs";
import DiscriminatorTabs from "@/components/docuoOpenapi/theme/DiscriminatorTabs";
import ApiTabs from "@/components/docuoOpenapi/theme/ApiTabs";
import ResponseSamples from "@/components/docuoOpenapi/theme/ResponseSamples";
import OperationTabs from "@/components/docuoOpenapi/theme/OperationTabs";
import Markdown from "@/components/docuoOpenapi/theme/Markdown";
import SecuritySchemes from "@/components/docuoOpenapi/theme/ApiExplorer/SecuritySchemes";
import ApiLogo from "@/components/docuoOpenapi/theme/ApiLogo";
import Export from "@/components/docuoOpenapi/theme/ApiExplorer/Export";
import { DocFrontMatter } from "@/components/docuoOpenapi/types";
import { DEFAULT_CURRENT_SLUG_VERSION } from "@/lib/constants";
import { getMDXComponent } from "mdx-bundler/client";
import { Mermaid } from "mdx-mermaid/lib/Mermaid";
import { defaultLanguage } from "@/components/context/languageContext";
import { PaginationData } from "@/components/articlePager";

const MDX_GLOBAL_CONFIG = {
  MdxJsReact: {
    useMDXComponents,
  },
};

const components = {
  CodeBlock,
  CodeGroup,
  Check: Callout.Check,
  Tip: Callout.Tip,
  Note: Callout.Note,
  Warning: Callout.Warning,
  Error: Callout.Error,
  Frame,
  Video,
  Heading,
  Button,
  Accordion,
  Tab,
  Tabs,
  Card,
  CardGroup,
  Step,
  Steps,
  a: (props) =>
    props.href && props.href.startsWith("http") ? (
      <a {...props} target="_blank" />
    ) : props.href && props.href.startsWith("/article/") ? (
      <a {...props} />
    ) : (
      <Link {...props} />
    ),
  mermaid: (props) => <Mermaid config={{ theme: "default" }} {...props} />,
  Mermaid: (props) => <Mermaid config={{ theme: "default" }} {...props} />,
  MethodEndpoint,
  ParamsItem,
  MimeTabs,
  TabItem,
  SchemaItem,
  SchemaTabs,
  DiscriminatorTabs,
  ApiTabs,
  ResponseSamples,
  OperationTabs,
  Markdown,
  SecuritySchemes,
  ApiLogo,
  Export,
};

interface Props {
  mdxSource: any;
  toc: TocItem[];
  slug: string[];
  docuoConfig: DocuoConfig;
  currentInstanceLabel: string;
  slugVersion: string;
  currentLanguage: string;
  currentGroupLabel: string;
  currentPlatformLabel: string;
  frontmatterRef: {
    fileName: string;
    firstParagraphContent: string;
    firstImgSrc: string;
  };
  curr: PaginationData;
}

export const getStaticProps = async ({ params }: SlugData) => {
  // TODO: Here some methods are executed multiple times
  const slug = params.slug;
  // Remove the effect of anchor points
  slug[slug.length - 1] = slug[slug.length - 1].replace(/#.*$/, "");
  
  // console.log(`[getStaticProps] Validating slug: ${slug.join("/")}`);
  
  // 验证slug是否有效 - 这是 ISR 的重要安全机制
  // 即使页面之前被缓存，如果源文件已删除，也会返回 404
  const allSlugs = CommonControllerImpl.readAllSlugsByFile();
  const currentSlugPath = slug.join("/");
  const isValidSlug = allSlugs.some((slugData) => {
    const validSlugPath = slugData.params.slug.join("/");
    return validSlugPath === currentSlugPath;
  });

  // console.log(`[getStaticProps] Slug validation result: ${isValidSlug}`);

  // 如果slug无效，返回404并清除可能的旧缓存
  if (!isValidSlug) {
    console.warn(`[ISR] Invalid slug detected: ${currentSlugPath}`);
    console.warn(`[ISR] This could be a deleted page - returning 404 to clear cache`);
    return {
      notFound: true,
      // 设置较短的重新验证时间，确保删除的页面快速失效
      revalidate: 1, // 1 秒后重新验证，确保删除操作快速生效
    };
  }
  
  // Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value.
  const docuoConfig = LibControllerImpl.getDocuoConfig();
  LibControllerImpl.addDefaultLink();
  const instances = LibControllerImpl.getInstances();
  const { instanceID, slugVersion, docVersion } =
    CommonControllerImpl.getExtractInfoFromSlug(slug, instances);
  const { currentLanguage } =
    LanguageControllerImpl.getInfoByInstanceID(instanceID);
  const folderTreeData = TreeControllerImpl.getFolderTreeDataBySlug(slug);
  const displayVersions = VersionsControllerImpl.getDisplayVersions(slug);
  const displayInstances =
    LibControllerImpl.getDisplayInstances(currentLanguage);
  const { displayLanguages, currentLanguageLabel } =
    LanguageControllerImpl.getDisplayLanguages(slug);
  const { displayGroups, currentGroup, currentGroupLabel } =
    GroupControllerImpl.getDisplayGroups(slug, currentLanguage);
  const { displayPlatforms, currentPlatform, currentPlatformLabel } =
    PlatformControllerImpl.getDisplayPlatforms(slug, currentLanguage);
  ShortLinkTransControllerImpl.injectData({ locale: currentLanguage });
  const postData = await DocsControllerImpl.readDoc(slug);
  const versions = CommonControllerImpl.getUsedVersions(
    instanceID,
    LibControllerImpl.getTargetInstance(instanceID)
  );
  const currentInstance = displayInstances.find((item) => {
    // Matches multiple language instance id
    return item.instance.id === instanceID;
  });
  const { prev, curr, next } = PagerControllerImpl.getPageTurningData(slug);
  const { displayCategorys, currentCategory, currentProduct } =
    CategoryTransControllerImpl.getDisplayCategorys(
      currentLanguage,
      instanceID,
      displayGroups
    );
  return {
    props: {
      ...postData,
      instanceID,
      currentInstanceLabel: currentInstance.instance.label,
      docVersion: docVersion || slugVersion || DEFAULT_CURRENT_SLUG_VERSION,
      slugVersion,
      folderTreeData,
      docuoConfig,
      displayVersions,
      displayInstances,
      currentLanguage,
      currentLanguageLabel,
      displayLanguages,
      currentGroup,
      currentGroupLabel,
      displayGroups,
      currentPlatform,
      currentPlatformLabel,
      displayPlatforms,
      versions,
      prev,
      curr,
      next,
      currentCategory,
      currentProduct,
      displayCategorys,
    },
    // ISR: 页面将在 24 小时后重新验证
    // 如果有新的请求进来，会在后台重新生成页面
    revalidate: 30, // 24 hours in seconds
  };
  // return {
  //   props: {},
  // };
};

export function getStaticPaths() {
  // ISR 优化：只预生成核心页面，其他页面按需生成
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    // 生产环境：只预生成首页和重要页面
    const corePaths = [
      // 预生成最重要的页面（通常是首页、概览页等高访问量页面）
      // 你可以根据 Google Analytics 数据来确定哪些页面访问量最高
      // { params: { slug: ['core_products', 'zim', 'overview'] } },
      // { params: { slug: ['uikit', 'callkit', 'quickstart'] } },
      // { params: { slug: ['general', 'en', 'overview'] } },
      // { params: { slug: ['general', 'zh', 'overview'] } },
    ];

    console.log(`[ISR] Pre-generating ${corePaths.length} core pages out of potentially thousands`);
    console.log(`[ISR] Other pages will be generated on-demand when first accessed`);
    console.log(`[ISR] This should reduce build time from ~15 minutes to ~2 minutes`);

    return {
      paths: corePaths,
      fallback: 'blocking', // 使用 blocking 模式提供更好的 SEO
    };
  } else {
    // 开发环境：生成所有路径以便调试
    console.time("getAllSlugs");
    const paths = SlugControllerImpl.generateAllSlugs();
    console.timeEnd("getAllSlugs");

    return {
      paths,
      fallback: true,
    };
  }
}

export default function DocPage(props: Props) {
  const { mdxSource, slug } = props;
  // console.log("DocPage", slug);
  if (!slug) {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const Component = useMemo(
    () => getMDXComponent(mdxSource.code, MDX_GLOBAL_CONFIG),
    [mdxSource.code]
  );
  return (
    <div className="prose" style={{ maxWidth: "unset" }}>
      <PageHead {...props}></PageHead>
      <article className="editor-wrapper">
        <ApiItem {...props}>
          {/* @ts-ignore */}
          {/* <MDXRemote {...mdxSource} components={components} /> */}
          {/* @ts-ignore */}
          <MDXProvider components={components}>
            <Component />
          </MDXProvider>
        </ApiItem>
      </article>
    </div>
  );
}

function PageHead(props: Props) {
  const {
    mdxSource,
    docuoConfig,
    frontmatterRef,
    slug,
    currentInstanceLabel,
    slugVersion,
    currentLanguage,
    currentGroupLabel,
    currentPlatformLabel,
    curr,
  } = props;
  const frontmatter = mdxSource.frontmatter as DocFrontMatter;
  const str = `${currentInstanceLabel ? currentInstanceLabel + " " : ""}${
    slugVersion ? slugVersion + " " : ""
  }`;
  let { title, keywords = [], description } = frontmatter;
  title = `${str}${
    title ||
    curr.description ||
    frontmatterRef.fileName ||
    docuoConfig.title ||
    ""
  }`;
  description = `${str}${
    description ||
    frontmatterRef.firstParagraphContent ||
    docuoConfig.description ||
    ""
  }`;
  const navbarLogo = docuoConfig.themeConfig.navbar.logo;
  let logo =
    typeof navbarLogo === "string"
      ? navbarLogo
      : typeof navbarLogo !== "undefined"
      ? navbarLogo.dark
      : "";
  logo = logo.includes("http")
    ? `${logo}`
    : logo
    ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${logo.replace(/^\//, "")}`
    : "";
  const ogSiteName = frontmatter["og:site_name"] || docuoConfig.title || "";
  const ogUrl =
    frontmatter["og:url"] ||
    `${
      process.env.NEXT_PUBLIC_CUSTOM_DOMAIN ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      ""
    }${process.env.NEXT_PUBLIC_BASE_PATH || ""}` ||
    "";
  const ogImage = frontmatter["og:image"] || "";
  const ogLocale = frontmatter["og:locale"] || "en_US";
  const ogLogo = frontmatter["og:logo"] || logo;
  const articlePublisher = frontmatter["article:publisher"] || "";
  const twitterUrl = frontmatter["twitter:url"] || "";
  const twitterImage =
    frontmatter["twitter:image"] || frontmatterRef.firstImgSrc;
  const twitterSite = frontmatter["twitter:site"] || "";
  const ogImageWidth = frontmatter["og:image:width"] || "";
  const ogImageHeight = frontmatter["og:image:height"] || "";
  const searchDocType =
    frontmatter["docType"] ||
    (currentLanguage === defaultLanguage ? "Docs" : "技术文档");

  if (currentLanguage !== defaultLanguage) {
    // 平台+开发语言+产品名称+SDK+文档标题 - 开发者中心 - ZEGO即构科技
    // Android Java 实时音视频 SDK 概述 - 开发者中心 - ZEGO即构科技
    title = `${currentPlatformLabel.replaceAll(
      /:\s*/g,
      " "
    )} ${currentGroupLabel} SDK ${
      frontmatter.title ||
      curr.description ||
      frontmatterRef.fileName ||
      docuoConfig.title
    } - 开发者中心 - ZEGO即构科技`;
    description = "";
    keywords = [];
  }
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(",")} />
      {ogSiteName ? (
        <meta property="og:site_name" content={ogSiteName}></meta>
      ) : null}
      <meta property="og:title" content={title}></meta>
      <meta property="og:description" content={description}></meta>
      {ogUrl ? <meta property="og:url" content={ogUrl}></meta> : null}
      {ogImage ? <meta property="og:image" content={ogImage}></meta> : null}
      {ogLocale ? <meta property="og:locale" content={ogLocale}></meta> : null}
      {ogLogo ? <meta property="og:logo" content={ogLogo}></meta> : null}
      {articlePublisher ? (
        <meta property="article:publisher" content={articlePublisher}></meta>
      ) : null}
      <meta name="twitter:title" content={title}></meta>
      <meta name="twitter:description" content={description}></meta>
      {twitterUrl ? (
        <meta name="twitter:url" content={twitterUrl}></meta>
      ) : null}
      {twitterImage ? (
        <meta name="twitter:image" content={twitterImage}></meta>
      ) : null}
      {twitterSite ? (
        <meta name="twitter:site" content={twitterSite}></meta>
      ) : null}
      {ogImageWidth ? (
        <meta property="og:image:width" content={ogImageWidth}></meta>
      ) : null}
      {ogImageHeight ? (
        <meta property="og:image:height" content={ogImageHeight}></meta>
      ) : null}
      <meta name="docsearch:doctype" content={searchDocType} />
      <link
        rel="canonical"
        href={`${
          process.env.NEXT_PUBLIC_CUSTOM_DOMAIN ||
          process.env.NEXT_PUBLIC_SITE_URL ||
          ""
        }${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${slug.join("/")}`}
      />
    </Head>
  );
}

DocPage.getLayout = function getLayout(page, pageProps) {
  return <PreviewLayout {...pageProps}>{page}</PreviewLayout>;
};
